package com.farmguardian;

import android.content.res.AssetFileDescriptor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.tensorflow.lite.Interpreter;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.util.HashMap;
import java.util.Map;

public class TFLiteClassifierModule extends ReactContextBaseJavaModule {

    private static final int INPUT_SIZE = 224;
    private static final int PIXEL_SIZE = 3; // RGB
    private static final int BATCH_SIZE = 1;
    // bytes per float
    private static final int FLOAT_TYPE_SIZE = 4;

    // Cache loaded interpreters keyed by model name
    private final Map<String, Interpreter> interpreterCache = new HashMap<>();

    public TFLiteClassifierModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "TFLiteClassifier";
    }

    /**
     * Classify an image at the given URI using the specified model asset.
     *
     * @param imageUri   content:// or file:// URI of the image
     * @param modelName  filename of the model inside assets/models/ (e.g. "maize.tflite")
     * @param numClasses number of output classes
     * @param promise    resolves with {scores: float[], topIndex: int, topScore: float}
     */
    @ReactMethod
    public void classify(String imageUri, String modelName, int numClasses, Promise promise) {
        try {
            // 1. Load (or retrieve cached) interpreter
            Interpreter interpreter = getInterpreter(modelName);

            // 2. Decode and resize image
            Bitmap bitmap = loadBitmapFromUri(imageUri);
            if (bitmap == null) {
                promise.reject("DECODE_ERROR", "Could not decode image at: " + imageUri);
                return;
            }
            Bitmap resized = Bitmap.createScaledBitmap(bitmap, INPUT_SIZE, INPUT_SIZE, true);

            // 3. Convert bitmap to normalized ByteBuffer [0, 1]
            ByteBuffer inputBuffer = bitmapToByteBuffer(resized);

            // 4. Run inference
            float[][] output = new float[BATCH_SIZE][numClasses];
            interpreter.run(inputBuffer, output);

            // 5. Build result
            float[] scores = output[0];
            int topIndex = 0;
            float topScore = scores[0];
            for (int i = 1; i < scores.length; i++) {
                if (scores[i] > topScore) {
                    topScore = scores[i];
                    topIndex = i;
                }
            }

            WritableArray scoresArray = Arguments.createArray();
            for (float s : scores) {
                scoresArray.pushDouble(s);
            }

            WritableMap result = Arguments.createMap();
            result.putArray("scores", scoresArray);
            result.putInt("topIndex", topIndex);
            result.putDouble("topScore", topScore);

            promise.resolve(result);

        } catch (Exception e) {
            promise.reject("INFERENCE_ERROR", e.getMessage(), e);
        }
    }

    /**
     * Releases a cached model interpreter to free memory.
     */
    @ReactMethod
    public void releaseModel(String modelName, Promise promise) {
        Interpreter interp = interpreterCache.remove(modelName);
        if (interp != null) {
            interp.close();
        }
        promise.resolve(null);
    }

    // ─── Private helpers ────────────────────────────────────────────────────────

    private Interpreter getInterpreter(String modelName) throws IOException {
        if (interpreterCache.containsKey(modelName)) {
            return interpreterCache.get(modelName);
        }
        MappedByteBuffer model = loadModelFile("models/" + modelName);
        Interpreter.Options options = new Interpreter.Options();
        options.setNumThreads(2);
        Interpreter interp = new Interpreter(model, options);
        interpreterCache.put(modelName, interp);
        return interp;
    }

    private MappedByteBuffer loadModelFile(String assetPath) throws IOException {
        AssetFileDescriptor afd = getReactApplicationContext().getAssets().openFd(assetPath);
        FileInputStream fis = new FileInputStream(afd.getFileDescriptor());
        FileChannel channel = fis.getChannel();
        long startOffset = afd.getStartOffset();
        long declaredLength = afd.getDeclaredLength();
        MappedByteBuffer buf = channel.map(FileChannel.MapMode.READ_ONLY, startOffset, declaredLength);
        fis.close();
        return buf;
    }

    private Bitmap loadBitmapFromUri(String uriString) {
        try {
            Uri uri = Uri.parse(uriString);
            InputStream stream = getReactApplicationContext()
                    .getContentResolver()
                    .openInputStream(uri);
            if (stream == null) return null;
            Bitmap bmp = BitmapFactory.decodeStream(stream);
            stream.close();
            return bmp;
        } catch (Exception e) {
            return null;
        }
    }

    private ByteBuffer bitmapToByteBuffer(Bitmap bitmap) {
        int bufferSize = BATCH_SIZE * INPUT_SIZE * INPUT_SIZE * PIXEL_SIZE * FLOAT_TYPE_SIZE;
        ByteBuffer buffer = ByteBuffer.allocateDirect(bufferSize);
        buffer.order(ByteOrder.nativeOrder());
        int[] pixels = new int[INPUT_SIZE * INPUT_SIZE];
        bitmap.getPixels(pixels, 0, INPUT_SIZE, 0, 0, INPUT_SIZE, INPUT_SIZE);
        for (int pixel : pixels) {
            // Extract R, G, B channels and normalize to [0, 1]
            float r = ((pixel >> 16) & 0xFF) / 255.0f;
            float g = ((pixel >> 8) & 0xFF) / 255.0f;
            float b = (pixel & 0xFF) / 255.0f;
            buffer.putFloat(r);
            buffer.putFloat(g);
            buffer.putFloat(b);
        }
        return buffer;
    }
}
