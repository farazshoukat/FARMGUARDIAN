# Abstract

FarmGuardian is an AI-powered decision support system designed to assist farmers in Punjab by improving crop health management and yield prediction. The project focuses on two primary modules: image-based disease detection and soil-and-yield analysis. FarmGuardian uses deep learning models like CNNs and transfer learning architectures to classify images of crop leaves and detect signs of diseases in their infancy. For predicting yield, it uses trustworthy forecasts based mainly on historical crop and soil data obtained from the FAO, SoilGrids, and PBS, and considering region-specific factors alongside historical data.

Designed as a smartphone application, the system incorporates an accessible, Urdu-based, icon-friendly interface for illiterate farmers. To lessen crop losses, improve farming practices, and enhance food security in Pakistan, FarmGuardian offers easily digestible, localized, and real-time recommendations. The initiative is a testament to the application of AI and machine learning in a pragmatic, farmer-focused manner, addressing one of the most urgent problems in the country.

# Introduction

We're excited to present this proposal for an AI-based decision support system for Punjab farmers called FarmGuardian. While Agriculture remains a major piece of Pakistan's economy and contributes to about 20% of the GDP, there are still major issues like low productivity, crop diseases and inefficient resource use. Farmers lose potential yield because professional, reliable, and local advice is often out of reach and not timely. Global systems and applications do not cater to the crops, local languages, and literacy levels in Pakistan. FarmGuardian will combine data driven yield predictions with image-based disease detection. Using deep learning models, FarmGuardian will classify and image and crop leaf to detect diseases in the early stages, while predictive analysis will be supported with soil hybrid model and yield historical datasets from the FAO, SoilGrids, and PBS\[1\], \[2\], \[3\]. FarmGuardian will not be like the traditional advisory systems; it will use a simple Urdu interface, and outputs will be icon-based for easy access to illiterate farmers. The need for improved productivity from Punjab's agricultural regions is urgent and is the background against which this system will operate. By reducing guess work AI enables farmers to adopt better and more sustainable practices.\[4\] The aim of this project is to increase yield and reduce crop losses, to helped support not only the economy of Pakistan, but the food security as well.

# Problem Statement

The software we developed tackles the biggest problem of Punjab's farmers: an absence of localized, timely, and affordable agricultural assistance. Farmers have a hard time early detecting crop disease, predicting yield, and figuring out the correct planning of irrigation and fertilizers. Since most farmers are illiterate and unable to understand technical information such as soil pH and NPK values, traditional advisory services are ineffective. Guesswork, and most importantly, late disease detection, will decrease productivity, and contribute to monetary loss and food scarcity. We are developing this system because existing solutions, such as international mobile applications, are not localized to Pakistan's crops, language, or farming practices. While systems like Plantix exist, they focus on different regions, do not support Urdu, and often require high connectivity or literacy levels.

# Problem Solution for Proposed System

FarmGuardian solves the identified problems by integrating artificial intelligence and user-centered design to deliver practical agricultural support. To address the challenge of early disease detection, the system uses image processing and machine learning models that analyse crop leaf images and classify them as healthy or diseased. This eliminates the reliance on guesswork and enables farmers to act quickly before diseases spread. For yield prediction, FarmGuardian leverages historical soil and production data from regional and global sources, providing forecasts tailored to Punjab's farming conditions.

Since farmers cannot interpret complex soil chemistry values such as pH or NPK,\[2\] the system avoids requiring them to input such data. Instead, it uses regional soil averages and simple Urdu-based inputs like soil colour, previous crops, or fertilizer type, making the process accessible even to illiterate farmers. The output is presented through a traffic-light style visualization (green for healthy, yellow for warning, red for diseased) along with recommendations in Urdu. This ensures farmers can understand results instantly without needing technical knowledge. To further address accessibility, the system is developed as a smartphone application with an Urdu interface. Most farmers now own basic smartphones, so the solution does not depend on expensive equipment or IoT sensors. The system also reduces dependency on delayed government advisory services by providing real-time analysis and feedback directly to the farmer's phone. From a technical perspective, FarmGuardian combines CNN/transfer learning for image classification with data-driven models for yield prediction\[5\]. This hybrid approach ensures that both disease detection and yield forecasting are accurate and reliable. By consolidating multiple agricultural advisory features into one platform, the system minimizes crop losses, optimizes resource use, and supports sustainable farming practices. Ultimately, FarmGuardian empowers farmers with timely, localized, and easy-to-understand information, directly solving the issues of illiteracy, lack of guidance, and delayed detection that currently limit productivity in Punjab's agriculture.

## Modules

Module 1: Disease Detection  
Farmers SELECT CROP TYPE WHICH ARE MAIZE WHEAT RICE POTATO AND TOMATOupload leaf images; AI model (CNN/transfer learning) detects disease status.  
**Special Feature:** Instant Urdu-based output with traffic-light indicators.

Module 2: Crop Yield Prediction  
Uses soil profiles and historical yield datasets to estimate expected production.  
**Special Feature:** Localized to Punjab regions.

Module 3: Soil & Resource Advisory  
Provides irrigation and fertilizer usage recommendations based on soil fertility and crop stage.  
**Special Feature:** Farmers input soil colour/previous crop instead of technical values.

Module 4: User Interface (Mobile App in Urdu)  
Smartphone application with simple Urdu interface, icons, and visuals for illiterate farmers.  
**Special Feature:** Accessibility-first design tailored to rural users.

Module 5: Reporting & Visualization  
Generates simple reports summarizing disease detection results and yield forecasts.  
**Special Feature:** Traffic-light style and Urdu text for ease of understanding.

## **Module 6: GeoSpatial Mapping Module**

This module will use interactive map layers to display crop distribution, land use, and soil suitability zones across Punjab. Farmers will be able to pinpoint their farm location on the map and receive area-specific advice based on soil and crop conditions. The system will highlight recommended versus non-recommended cultivation areas, making the guidance more regionally accurate. By linking predictions to geographic data, the module provides farmers with localized, visual insights that are easy to interpret.\[7\]  
**Special Feature:** Integration of geospatial layers with advisory results for region-specific

**Module 7: Admin and Login Management**  
This module manages user authentication and administrative control within the system. Farmers can register and log in to access personalized features such as saved reports and history. Administrators have separate access to manage users, datasets, and system updates. It ensures secure access, role-based permissions, and smooth operation of the application.

**Special Feature:** Role-based access control for farmers and administrators.

**Software Process Methodology**

For the development of FarmGuardian, we will use the **Object-Oriented Methodology (OOM)**. This approach is most suitable since our project involves multiple independent yet interacting modules such as disease detection, yield prediction, soil advisory, and reporting. By using OOM, we can ensure modularity, reusability, and easier maintenance of code, which is important for a group project. Additionally, OOM aligns well with our choice of technologies such as Python (for machine learning) and **React NATIVE** (mobile application), both of which support object-oriented design principles. This methodology will allow us to design a scalable system that can be extended with new features such as geospatial mapping or market advisory in the future.

| **Type** | **Tools and Technologies** | **Version** | **Rationale** |
| --- | --- | --- | --- |
| Frontend | ReactNative | 18  | Frontend framework for building interactive farmer UI.URDU |

REMEMBER ONLY 5 CROPS ARE INCLUDED AND THESE ARE MAIZE WHEAT TOMATO POTATO AND RICE