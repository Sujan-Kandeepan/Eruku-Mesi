# Software Requirements Specification

## For Eruku Mesi North America

Version 0.1  
Prepared by Darren Tu, Immanuel Odisho, Sophia Ji Who Choi and Sujan Kandeepan  
McMaster University  
Friday, October 16, 2020

## Table of Contents

- [Software Requirements Specification](#software-requirements-specification)
  - [For Eruku Mesi North America](#for-eruku-mesi-north-america)
  - [Table of Contents](#table-of-contents)
  - [Revision History](#revision-history)
  - [1. Introduction](#1-introduction)
    - [1.1 Document Purpose](#11-document-purpose)
    - [1.2 Product Scope](#12-product-scope)
    - [1.3 Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    - [1.4 References](#14-references)
    - [1.5 Document Overview](#15-document-overview)
  - [2. Product Overview](#2-product-overview)
    - [2.1 Product Perspective](#21-product-perspective)
    - [2.2 Product Functions](#22-product-functions)
    - [2.3 Product Constraints](#23-product-constraints)
    - [2.4 User Characteristics](#24-user-characteristics)
    - [2.5 Assumptions and Dependencies](#25-assumptions-and-dependencies)
    - [2.6 Apportioning of Requirements](#26-apportioning-of-requirements)
  - [3. Requirements](#3-requirements)
    - [3.1 External Interfaces](#31-external-interfaces)
      - [3.1.1 User Interfaces](#311-user-interfaces)
      - [3.1.2 Hardware Interfaces](#312-hardware-interfaces)
      - [3.1.3 Software Interfaces](#313-software-interfaces)
    - [3.2 Functional Requirements](#32-functional-requirements)
    - [3.3 Quality of Service](#33-quality-of-service)
      - [3.3.1 Performance](#331-performance)
      - [3.3.2 Security](#332-security)
      - [3.3.3 Reliability](#333-reliability)
      - [3.3.4 Availability](#334-availability)
    - [3.4 Compliance](#34-compliance)
    - [3.5 Design and Implementation](#35-design-and-implementation)
      - [3.5.1 Installation](#351-installation)
      - [3.5.2 Distribution](#352-distribution)
      - [3.5.3 Maintainability](#353-maintainability)
      - [3.5.4 Reusability](#354-reusability)
      - [3.5.5 Portability](#355-portability)
      - [3.5.6 Cost](#356-cost)
      - [3.5.7 Deadline](#357-deadline)
      - [3.5.8 Proof of Concept](#358-proof-of-concept)
  - [4. Verification](#4-verification)

## Revision History

| Name | Date    | Reason For Changes  | Version   |
| ---- | ------- | ------------------- | --------- |
| Darren Tu, Immanuel Odisho, Sophia Ji Who Choi and Sujan Kandeepan | Friday, October 19, 2020 | Initial version | 0.1 |

## 1. Introduction

<!-- This section should provide an overview of the entire document -->

Eruku Mesi North America is a final-year capstone project for COMPSCI 4ZP6 at McMaster University.
It is currently being developed by The Bloggers which is a team consisting of Darren Tu, Immanuel Odisho, Sophia Ji Who Choi and Sujan Kandeepan.
This application will aim to provide an effective means of communication between people from the Nigerian village of Eruku across its worldwide diasporas.
The intended goal for users is to strengthen communities and relationships between the Eruku people, sustain and promote the village culture, and find support and donors to help rebuild Eruku.
This software requirements specification document will give a complete description of the project requirements and outline what is currently expected from the final product.

### 1.1 Document Purpose

<!-- Describe the purpose of the SRS and its intended audience. -->

The purpose of this software requirements specification document is to outline the expected behaviour and function of the application to be built, describing its goals and how it will serve to accomplish them.
This document will serve as a reference point for stakeholders to understand the exact parameters and goals of the application that needs to be built, during its various stages in development and verification.
Following an overview of how this application aims to solve a stated problem, all ideas, expectations and considerations for the product, from the various stakeholders, will be centralized and explicitly defined by this document.
This information will be contained in a detailed explanation of the problem to be solved, complete requirements for this application, and approaches for verification that these requirements are being met.

### 1.2 Product Scope

<!-- Identify the product whose software requirements are specified in this document, including the revision or release number. Explain what the product that is covered by this SRS will do, particularly if this SRS describes only part of the system or a single subsystem. Provide a short description of the software being specified and its purpose, including relevant benefits, objectives, and goals. Relate the software to corporate goals or business strategies. If a separate vision and scope document is available, refer to it rather than duplicating its contents here. -->

Eruku Mesi North America is a cross-platform mobile application for people from the Eruku village in Nigeria, many of whom have emigrated worldwide, to easily communicate and stay updated on events and other noteworthy items within their community.
Key features are localized push notifications for events nearby each individual user, the ability for an administrator to upload relevant media content to be viewable by all users, and an interactive chat function with automated replies, driven by machine learning, if no other users are available.
Additional features would include a calendar with details and location information for current and future events, and the ability for regular users to upload media content for a social media component of the application.
Another request from the client had been to revamp the current website: <http://erukumesinorthamerica.org/>.
This application may also include a feedback form for users to suggest improvements to the application, and search engine optimization to make the application more easily discoverable.

This application aims to provide a simple and effective means of communication between individuals from the Eruku village so they can sustain a shared culture and maintain a sense of togetherness within their worldwide community.
Maintaining the Eruku village culture in current and future generations is a high priority for these people.
Physical distance is also seen as a significant limitation preventing Eruku people from communicating regularly and effectively.
This application aims primarily to solve both of these problems by acting as a central means for Eruku people worldwide to communicate, using the chat function, share and learn about their culture, through the uploaded media, and partake in nearby social and cultural events as shown in the push notifications.
There is also a great need for support and donations to build schools, hospitals, and other important infrastructure and resources for the village, made possible through the increased discussion and sharing of news within the community.

### 1.3 Definitions, Acronyms and Abbreviations

<!-- Fill these in as we write the rest of the doc -->

The following abbreviations and acronyms will be used in later sections of this document:

- App: Application
- AWS: Amazon Web Services
- GPS: Global Positioning System
- OS: Operating system
- Wi-Fi: Wireless Fidelity

### 1.4 References

<!-- List any other documents or Web addresses to which this SRS refers. These may include user interface style guides, contracts, standards, system requirements specifications, use case documents, or a vision and scope document. Provide enough information so that the reader could access a copy of each reference, including title, author, version number, date, and source or location. -->

[1] J. Doyle, “A Complete Overview of Canada's Accessibility Laws,” Siteimprove, 22-Jul-2020. [Online]. Available: <https://siteimprove.com/en-ca/blog/a-complete-overview-of-canada-s-accessibility-laws/>. [Accessed: 19-Oct-2020].  
[2] (n.d.). Retrieved October 19, 2020, from <https://www.citationmachine.net/bibliographies/e209d4f2-f1cd-4e71-b503-5f31e067d50e>

### 1.5 Document Overview

<!-- Describe what the rest of the document contains and how it is organized. -->

The remaining sections of this document will respectively give a general overview of the product to be built, a full description of the application requirements, and details on how testing and verification are to be conducted.
The product overview will outline the original problem, user expectations, and other factors that will determine the requirements for this application.
After expressing the problem and the resulting demand for this application, this document will outline the intended functions and expected constraints with this application, describe the target users as they will use this application, and explain any contingencies that may affect the requirements going forward.
Requirements will be specified in full detail regarding hardware, software and user interface requirements, exact functional requirements, requirements for product quality and compliance, and criteria for design and implementation.
Finally, details on verification will outline methods and techniques to be used for testing the application to ensure it meets the aforementioned requirements detailed in the previous section.

## 2. Product Overview

<!-- This section should describe the general factors that affect the product and its requirements. This section does not state specific requirements. Instead, it provides a background for those requirements, which are defined in detail in Section 3, and makes them easier to understand. -->

### 2.1 Product Perspective

<!-- Describe the context and origin of the product being specified in this SRS. For example, state whether this product is a follow-on member of a product family, a replacement for certain existing systems, or a new, self-contained product. If the SRS defines a component of a larger system, relate the requirements of the larger system to the functionality of this software and identify interfaces between the two. A simple diagram that shows the major components of the overall system, subsystem interconnections, and external interfaces can be helpful. -->

The Eruku Mesi North America application will build from and be directly based on an existing website: <http://erukumesinorthamerica.org/>.
A previous developer has already worked on a cross-platform mobile application with basic functionality and a minimal interface that is not ready to be published.
The current website has informational pages describing the Eruku village and its history, alluding to the problem statement behind this application, under the "About Us" and "Archive" sections.
It also offers basic implementations for the key requested features under the "Gallery", "Upcoming Events" and "Interactive Blog" sections, which are to be improved upon in the final product.

The application to be developed is expected to be ready for production with full implementations of the key requested features, and as many of the important but non-critical features as can be delivered by the initial stable release.
The scope of this project may also include improvements to the current website to implement a more modern interface and offer complete functionality for all features.
The main component of the software project will be the mobile application to be published on application stores and potentially be used by villagers and worldwide emigrants from Eruku.

Stakeholders of the application include the following people:

- Developers: Darren Tu, Immanuel Odisho, Sophia Ji Who Choi, Sujan Kandeepan.
  - Responsible for implementation of features and verification of requirements throughout development process.
- Client/supervisor: Andrew Duong, Dr. Femi Ayeni.
  - Identify problem to be solved using the application, define requirements by the product being built, and provide guidance and instructions which influence the development process and the final product to be built.
- Customers/users: Members of the Eruku village community.
  - Users of application for whom the product must be accessible while satisfying user expectations and goals.
- COMPSCI 4ZP6 course staff: Dr. Jacques Carette, Brendan Fallon, Ethan Chan
  - Responsible for evaluating Capstone project to ensure it meets expectations while providing guidance during term.

### 2.2 Product Functions

<!-- Summarize the major functions the product must perform or must let the user perform. Details will be provided in Section 3, so only a high level summary (such as a bullet list) is needed here. Organize the functions to make them understandable to any reader of the SRS. A picture of the major groups of related requirements and how they relate, such as a top level data flow diagram or object class diagram, is often effective. -->

Listed here are the key functions of the application:

- Central news feed displaying upcoming events and other noteworthy items pertaining to the Eruku village community.
- Mobile push notifications alerting users of upcoming social and cultural events, near their location, organized by and intended for people from the Eruku village community.
- Interface for a single administrator to upload pictures, videos, files, and other types of media, displaying people, items, and places that are significant to the Eruku village, to be stored in a central database and visible to other users of the application.
- Interactive chat function for users to share messages in a common thread, with automated replies, driven by machine learning, if there are no other active users available to reply.
- Calendar displaying time, location, and description for events as they appear in push notifications (desired but not critical).
- Interface for regular users of the application to upload media, similarly to the administrator, in a separate section of the application for social networking (desired but not critical).
- Form for users to submit feedback and suggestions for improvement of the application in future releases (low priority).

### 2.3 Product Constraints

<!-- This subsection should provide a general description of any other items that will limit the developer’s options. These may include:  

- Interfaces to users, other applications or hardware.  
- Quality of service constraints.  
- Standards compliance.  
- Constraints around design or implementation. -->

The mobile application is constrained by the Internet connectivity.
Physical distance between users will also slow down Internet connectivity and latency during page load, location tracking, sending and receiving messages, and other features will be increased.
Since the application fetches data from a database over the Internet, it is crucial to have stable Internet connectivity.
Application functionality may additionally be restricted by the accuracy of location tracking on the user's device.
An incorrect location calculation may result in the user receiving wrong results for localized events, news stories, etc.

### 2.4 User Characteristics

<!-- Identify the various user classes that you anticipate will use this product. User classes may be differentiated based on frequency of use, subset of product functions used, technical expertise, security or privilege levels, educational level, or experience. Describe the pertinent characteristics of each user class. Certain requirements may pertain only to certain user classes. Distinguish the most important user classes for this product from those who are less important to satisfy. -->

Users will primarily consist of people who are currently living in or have already emigrated from the Eruku village in Nigeria.
These users are expected to have low to average proficiency with technology and would expect a simplified and user-friendly interface to understand how to use the application.
Users living in North America and other first-world regions, who will be the primary target audience for this application, would likely have more exposure and comfort with modern interfaces and are therefore a separate user class from people still living in Eruku.
As the application is targeting all ages, separate user classes could also be recognized between children, teenagers, young adults, middle-aged adults, and seniors.
This application will target all genders equally, as users may interact more closely with other users of the same gender but will all perceive and interact with this application the same way.

This application will primarily target age groups close to young adults and those living in North America who have emigrated from Eruku.
Young adults and teenagers are expected to have greater digital literacy and confidence than children and adults who are older.
Experienced users may expect greater functionality and thorough implementations of the core features while novice users may expect an interface that is simple without an excess of features and options.
Users living in North America will likely have been exposed to many similar interfaces and are not expected to require too much accommodation.
A relatively small portion of users who are living or have recently emigrated from Eruku may have less confidence using the application and would require the interface to be accessible to them.
Overall, an interface designed for users with average smartphone proficiency and digital literacy should accommodate most users.

### 2.5 Assumptions and Dependencies

<!-- List any assumed factors (as opposed to known facts) that could affect the requirements stated in the SRS. These could include third-party or commercial components that you plan to use, issues around the development or operating environment, or constraints. The project could be affected if these assumptions are incorrect, are not shared, or change. Also identify any dependencies the project has on external factors, such as software components that you intend to reuse from another project, unless they are already documented elsewhere (for example, in the vision and scope document or the project plan). -->

A key assumption when designing this application is that the user's device meets the expected basic hardware requirements.
This includes Wi-Fi or cellular connectivity with reasonable data transfer speeds and GPS services with sufficient location accuracy.
The device should also have decent processing power to handle basic client-side actions while most work is done on the server side and fetched by the application.
A proper display with a responsive, low-latency touch screen is also required for the interface to function and be displayed properly.
Devices will be assumed to have a minimum OS version of Android 6.0 or iOS 7.

This project will have a dependency on the existing website from which the mobile application will implement similar functionality and use as a starting point for formulating a user interface design, while the current website may receive interface improvements if possible.
The current website is hosted at the following location: <http://erukumesinorthamerica.org/>.

### 2.6 Apportioning of Requirements

<!-- Apportion the software requirements to software elements. For requirements that will require implementation over multiple software elements, or when allocation to a software element is initially undefined, this should be so stated. A cross reference table by function and software element should be used to summarize the apportioning.

Identify requirements that may be delayed until future versions of the system (e.g., blocks and/or increments). -->

As the scope of this application is quite broad and consists of multiple components, there are some features and demands which take higher precedence than others which may be deferred to a future release if targeting the initial release is not feasible.
The following table details which features are to be prioritized or potentially deferred:
| Feature | Priority |
| --- | --- |
| Central feed for news and local events | Mandatory for initial release, high priority |
| Localized push notifications for events | Mandatory for initial release, high priority |
| Media content uploaded by administrator | Mandatory for initial release, high priority |
| Interactive chat function | Mandatory for initial release, high priority |
| Machine learning integration in chat function | Important but can be deferred, medium/high priority |
| Event calendar view | Important but can be deferred, medium/high priority |
| Media content uploaded by regular users | Important but can be deferred, medium/high priority |
| Revamp current website | Important but can be deferred, medium/high priority |
| Feedback form for user suggestions | Likely to be deferred, low/medium priority |
| Search engine optimization for application stores | Likely to be deferred, low/medium priority |

<!-- Likely need to update this table as we fill remaining sections -->

## 3. Requirements

<!-- This section specifies the software product's requirements. Specify all of the software requirements to a level of detail sufficient to enable designers to design a software system to satisfy those requirements, and to enable testers to test that the software system satisfies those requirements. -->

<!-- The specific requirements should:

- Be uniquely identifiable.
- State the subject of the requirement (e.g., system, software, etc.) and what shall be done.
- Optionally state the conditions and constraints, if any.
- Describe every input (stimulus) into the software system, every output (response) from the software system, and all functions performed by the software system in response to an input or in support of an output.
- Be verifiable (e.g., the requirement realization can be proven to the customer's satisfaction)
- Conform to agreed upon syntax, keywords, and terms. -->

### 3.1 External Interfaces

<!-- This subsection defines all the inputs into and outputs requirements of the software system. Each interface defined may include the following content:

- Name of item
- Source of input or destination of output
- Valid range, accuracy, and/or tolerance
- Units of measure
- Timing
- Relationships to other inputs/outputs
- Screen formats/organization
- Window formats/organization
- Data formats
- Command formats
- End messages -->

#### 3.1.1 User Interfaces

<!-- Define the software components for which a user interface is needed. Describe the logical characteristics of each interface between the software product and the users. This may include sample screen images, any GUI standards or product family style guides that are to be followed, screen layout constraints, standard buttons and functions (e.g., help) that will appear on every screen, keyboard shortcuts, error message display standards, and so on. Details of the user interface design should be documented in a separate user interface specification.

Could be further divided into Usability and Convenience requirements. -->

Per the user description provided in Section 2.4 (User Characteristics), the interface of the application will need to be accessible for users with low to average digital literacy and proficiency with modern interfaces, to ensure ease of use and ease of learning.
This is a general requirement pertaining to the specific user interface requirements, for specific application components, listed below.

User interface requirements will be listed and expanded upon in individual Product Use Case (PUC) tables, pertaining to the key application functions as listed in Section 2.2 (Product Functions).

| PUC No. 1 | Central feed for news, media and local events |
| ----- | ----- |
| Description | Central Feed constantly updates lists of content including upcoming events, news, and media on the main page.    |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | User opens the application or refreshes the main page for an updated view of the feed. |
| Output/response | Page is displayed showing information about upcoming events and news items as well as media which may be of interest to the user.  |
| Functions performed | Application fetches and renders content relevant to the user by their location. |
| Verification | Simulate various scenarios for content to be displayed by creating events and posting updates for a created user at some location. |

| PUC No. 2 | Event notification received by user |
| ----- | ----- |
| Description | User receives a notification from the application about an upcoming social or cultural event near their location, with a preview of the name, date/time, and location.  |
| Conditions and constraints | User is connected to the Internet. User opted-in for location-based push notifications and gave the application permissions to always have access to user location|
| Input/stimulus | Background application service determines that user should be notified of the event. |
| Output/response | Notification is pushed to native system notifications interface on Android or iOS. |
| Functions performed | Application records that a notification for this event has already been sent and will not notify the user a second time. |
| Verification | Create an event that takes place near the detected location of the user and not too far in the future to determine whether the user is notified with correct event information. |

| PUC No. 3 | Event notification dismissed by user |
| ----- | ----- |
| Description | User dismisses event notification from native system notifications interface. |
| Conditions and constraints | User opted-in for location-based push notifications and gave the application permissions to always have access to user location. Notification has been delivered and has not yet been opened or dismissed by the user. |
| Input/stimulus | User performs the action specific to their device OS to dismiss the notification. |
| Output/response | Notification is removed from the native system notifications interface. |
| Functions performed | None within the application as this is a system-level action performed externally. |
| Verification | Ensure that a delivered notification is not locked permanently in the notifications list. |

| PUC No. 4 | Event notification opened by user |
| ----- | ----- |
| Description | User opens notification to view complete details of specific event within application. |
| Conditions and constraints | User opted-in for location-based push notifications and gave the application permissions to always have access to user location. Notification has been delivered and has not yet been opened or dismissed by the user. |
| Input/stimulus | User performs the action specific to their device OS to dismiss the notification. |
| Output/response | Application is launched or brought to the foreground to display a page with details specific to the event from the notification. |
| Functions performed | Application is directed to the respective page where the requested information is to be requested and displayed to the user. |
| Verification | Perform action specific to device OS to open a delivered notification from the application and expect the correct page to be opened. |

| PUC No. 5 | View detailed event information |
| ----- | ----- |
| Description | User views detailed event information page. |
| Conditions and constraints | User is connected to the Internet. |
| Input/stimulus | User has been directed to application page pertaining to an opened event notification. |
| Output/response | Page loads with requested information showing name, date/time, address, rate/fee, contact information, etc. for the event. |
| Functions performed | Application loads detailed information pertaining to event displayed in opened notification and renders to user interface. |
| Verification | Ensure page loads and correct information is displayed once notification has been opened. |

| PUC No. 6 | Post new event (admin only) |
| ----- | ----- |
| Description | Admin user creates a new event post about an upcoming social or cultural event, with the name, date/time, and location in the admin panel. After the admin user submits the event form, the new event is posted on the event page of the application.   |
| Conditions and constraints | Admin user is connected to the Internet with an authenticated account and is granted administrator privileges.|
| Input/stimulus | Admin user enters event information in the form on the admin page and submits the form. |
| Output/response | The new event post appears on the event page of the application. Users will be able to see the post and its detailed information. |
| Functions performed | The event details will get saved in the database once the admin user submits the form. The new event post will show up on the event page.  |
| Verification | Test whether the admin user can open and submit the event form in the admin panel. Check whether there is a new entry of the event details in the database. Finally, when the event page of the application is refreshed, check whether the new event is visible to users.  |

| PUC No. 7 | Update event details (admin only) |
| ----- | ----- |
| Description | Admin user updates the event details such as the name, date/time, and location in the admin panel. |
| Conditions and constraints | Admin user is connected to the Internet with an authenticated account and is granted administrator privileges |
| Input/stimulus | Admin user clicks the "Edit Details" button beside the event they want to edit on the event page in the admin panel. Then, the admin user edits the event details form and save the form.  |
| Output/response | The event details will get updated on the event page of the application. |
| Functions performed | The event entry will get updated in the database after the admin user saves the event-form in the admin panel.  |
| Verification | Test whether the admin user can open the event form in the admin panel after clicking the "Edit Details" button beside the event. Check whether the entry is correctly updated in the database. Finally, when the event page of the application is refreshed, check whether the event details are updated. |

| PUC No. 8 | Delete/cancel event (admin only) |
| ----- | ----- |
| Description | Admin user deletes the event in the admin panel. The event is no longer visible to users on the event pages in the application. |
| Conditions and constraints | Admin user is connected to the Internet with an authenticated account and is granted administrator privileges |
| Input/stimulus | Admin user clicks the "Delete Event" button beside the event they want to delete on the event page in the admin panel. |
| Output/response | The event will be deleted on the event page of the application. |
| Functions performed | The event entry will be removed from the database. |
| Verification | Test whether the admin user can click the "Delete Event" button beside the event in the admin panel. Check whether the event entry is removed from the database. Finally, when the event page of the application is refreshed, check if the event no longer exists. |

| PUC No. 9 | Share content uploaded by other users |
| ----- | ----- |
| Description | User shares content such as events, news, photos, etc uploaded by the administrator or other regular users. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application.|
| Input/stimulus | User views content on pages such as event, news, photo, etc. on the application. User clicks the "Share" button below or beside the content they want to share.  |
| Output/response | User can view content on the event and news, etc. pages of the application. After the "Share" button is clicked, the application generates a sharable link that the user can copy.  |
| Functions performed | The application fetches content from the database on page load. For sharing content, the application generates and provides the sharable URL link for the content. |
| Verification | Test whether the user can see and copy the sharable link when the "Share" button is clicked. Test whether the generated link is correctly functional.  |

| PUC No. 10 | View messages sent by other users |
| ----- | ----- |
| Description | Common thread for users to view messages sent by other users of the application. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | User navigates to public messages thread. |
| Output/response | Application displays chronological list of messages sent, scroll point at latest message. |
| Functions performed | Application retrieves messages sent by other users, sorts by date and time sent, and renders ordered list view of messages. |
| Verification | Send messages from other authenticated users and ensure that administrator and regular users can view history. |

| PUC No. 11 | Send new public message |
| ----- | ----- |
| Description | Ability for users to send messages to be viewed by all other users of the application. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | User composes message and presses "Send". |
| Output/response | Message is received and visible to other users currently logged into application, or those who will open message thread later. |
| Functions performed | Message is stored in database with metadata about user and date/time message was sent. |
| Verification | Ensure administrator and regular users both can send messages that appear in database and messages view of other users. |

| PUC No. 12 | Automated replies through machine learning |
| ----- | ----- |
| Description | Automated replies to publicly sent messages for common questions when there are no other users actively using messages thread. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application, but no other users are actively using the public messaging feature of the application. |
| Input/stimulus | User sends message and waits for reply. |
| Output/response | Automated reply generated and becomes visible below message sent by user. |
| Functions performed | Application creates automated response using machine learning after parsing text and interpreting message to generate reply. |
| Verification | Send various messages with just single user logged into application and expect appropriate responses from application. |

| PUC No. 13 | Account creation |
| ----- | ----- |
| Description | A first-time user must create their account on the log-in/sign-in page by clicking the “Sign-in” button. The user sets username and password and enters essential user information such as their region, notification settings, etc. User must agree to the terms and conditions.    |
| Conditions and constraints | User is connected to the Internet. |
| Input/stimulus | User clicks the “Sign-up” button on the Log-in/sign-up page. The user enters a username, password, region, and notification settings into the account creation form and submits the form.|
| Output/response | When the user submits the sign-up form, the account information is encrypted and stored securely in the database.  |
| Functions performed | User account is created when the user submits the sign-up form. The application will encrypt the login credentials and create a new account entry in the database along with user information. |
| Verification | Test whether the user can create an account with the sign-up form. Test whether new login credentials are stored encrypted in the database. |

| PUC No. 14 | User authentication |
| ----- | ----- |
| Description |  After the user registered, they log in to the application by clicking the “Log in” button and using their log-in credentials. |
| Conditions and constraints | User is connected to the Internet. |
| Input/stimulus | User clicks the “Login” button on the Log-in/sign-up page. The user enters the username and password into the login form and submits the form. |
| Output/response | When the user attempts to log in to an account with their login credentials, the application authenticates a user with a username and password.  |
| Functions performed | User authentication will occur when the user attempts to log-in. If the correct log-in credentials are provided by the user, the user will be able to re-directed to the main page of the application and view content. |
| Verification | Test whether the user can log in with their credentials in a secure manner. Test whether the user can log in with invalid credentials. |

| PUC No. 15 | Calendar view of upcoming local events |
| ----- | ----- |
| Description | User views the calendar by month to see upcoming local events on the Calendar page. From the calendar, user can click the event to see event details. |
| Conditions and constraints | User is connected to the Internet, has been authenticated from within the application, and current time and user location are known. |
| Input/stimulus | User opens calendar from within application. |
| Output/response | Monthly calendar is displayed with entries under the respective days when there are events taking place, with details regarding time, location, description, etc. |
| Functions performed | Application filters events based on date and location to display those which are nearby the user and within the current month. |
| Verification | Post several nearby events within the current month and expect a populated calendar. |

| PUC No. 16 | Content shared by administrator |
| ----- | ----- |
| Description | Ability for administrator to share content to be viewed by regular users. |
| Conditions and constraints | User is connected to the Internet, has been authenticated from within the application and has administrator privileges. |
| Input/stimulus | User clicks a button which leads to a share interface where they can specify which photos, videos, files, etc. to share. |
| Output/response | Media is uploaded and stored in database. |
| Functions performed | Application receives media and stores into database with metadata about user and their post such as date, time, location, description. |
| Verification | Share media using a created user and check that media has been stored in database. |

| PUC No. 17 | Content shared by regular user |
| ----- | ----- |
| Description | Option for regular users to share content to be viewed by other regular users. |
| Conditions and constraints | User is connected to the Internet, has been authenticated from within the application and has regular user privileges. |
| Input/stimulus | User clicks a button which leads to a share interface where they can specify which photos, videos, files, etc. to share. |
| Output/response | Media is uploaded and stored in database. |
| Functions performed | Application receives media and stores into database with metadata about user and their post such as date, time, location, description. |
| Verification | Share media using a created user and check that media has been stored in database. |

| PUC No. 18 | Content viewed by admin or regular user |
| ----- | ----- |
| Description | Interface for all users to view media content shared by admin and other users. |
| Conditions and constraints | User is connected to the Internet, has been authenticated from within the application and has admin or regular user privileges. |
| Input/stimulus | User enters the user-shared content of application, scrolls through page. |
| Output/response | Application displays scrolling feed of content recently uploaded by other users, reverse-chronological display of content not seen. |
| Functions performed | Application filters through user-uploaded content to display media uploaded which has been uploaded recently and has not been displayed to the user, then records which posts have been shown to avoid duplication.  |
| Verification | Create several posts from other users and expect feed seen by current user to show relevant and recent media content. |

| PUC No. 19 | Improvements to existing website |
| ----- | ----- |
| Description | Interface improvements to existing website: <http://erukumesinorthamerica.org/> |
| Conditions and constraints | Back-end functionality is implemented and still usable for functions intended on website. |
| Input/stimulus | User navigates to respective pages on website to perform functions which have been already somewhat implemented. |
| Output/response | A more modern and usable interface is expected where there is already back-end functionality implemented for each page. |
| Functions performed | Same back-end functions as existing website and/or mobile application in development. |
| Verification | Navigate through pages and perform actions as done on current website to evaluate aesthetic and usability of interface. |

| PUC No. 20 | Feedback form for user suggestions |
| ----- | ----- |
| Description | When user clicks the "Provide Feedback" button located on the footer, user can provide feedback/suggestions by filling out a feedback form. |
| Conditions and constraints | User is connected to the Internet |
| Input/stimulus | User enters feedback or suggestions they have for improving the application on the feedback page. |
| Output/response | Once the feedback form is submitted, the application either sends the form details to the admin users or creates a ticket in the user feedback software automatically.   |
| Functions performed | User opens the feedback form on the feedback page. The submit button in the form will trigger to send an email to the admin users.  |
| Verification | Test whether user can submits the feedback form on the feedback page. Test whether admin users can view the submitted suggestions or feedback from users. |

#### 3.1.2 Hardware Interfaces

<!-- Describe the logical and physical characteristics of each interface between the software product and the hardware components of the system. This may include the supported device types, the nature of the data and control interactions between the software and the hardware, and communication protocols to be used. -->

This application will target mobile devices such as smartphones and tablets.
Devices are expected to meet expected basic hardware requirements, as stated in Section 2.5 (Assumptions and Dependencies):

- Wi-Fi or cellular connectivity with reasonable data transfer speeds and GPS services with sufficient location accuracy.
- Decent processing power to handle basic client-side actions while most work is done server-side and fetched by the application.
- Proper display with a responsive, low-latency touch screen for the interface to function and be displayed properly.
- Minimum OS version: Android 6.0 or iOS 7.

Wi-Fi will be used by the application to communicate with the server for most online functionalities of the application.
GPS and Wi-Fi based location services will be used to determine the user's location as a basis for localized notifications and news updates.
A touch-based interface will be used with the prerequisite that the device has an operational touch screen capable of handling basic touch gestures such as taps, swipes, etc. at all touch points.

#### 3.1.3 Software Interfaces

<!-- Describe the connections between this product and other specific software components (name and version), including databases, operating systems, tools, libraries, and integrated commercial components. Identify the data items or messages coming into the system and going out and describe the purpose of each. Describe the services needed and the nature of communications. Refer to documents that describe detailed application programming interface protocols. Identify data that will be shared across software components. If the data sharing mechanism must be implemented in a specific way (for example, use of a global data area in a multitasking operating system), specify this as an implementation constraint. -->

This application is to be be built using the following technologies:

- Node.js (back-end JavaScript development framework and runtime environment, latest version).
- Express.js (server architecture framework for Node.js, latest version).
- MongoDB (non-relational database management system, latest version).
- React Native (cross-platform mobile application development framework using JavaScript, latest version).
- Ubuntu 20.04 (proposed server OS).
- Amazon Web Services (AWS) (cloud server platform).
- REST API + multiple JavaScript libraries.

Node.js, Express.js, MongoDB, and React Native collectively form the "MERNN stack" primarily used for development of the application.
Data will be stored in a MongoDB database wherever applicable for saving user account data, uploaded media, shared messages, etc.
Communication protocols will be handled by the REST API and code written in the Node.js/Express.js back end of the source code.
AWS will handle server-side computation required by the application.

### 3.2 Functional Requirements

<!-- This section specifies the requirements of functional effects that the software-to-be is to have on its environment. -->

Functional requirements will be listed and expanded upon in individual tables which reference PUC tables given in Section 3.1.1 (User Interfaces), pertaining to key functions as listed in Section 2.2 (Product Functions).

| ID: FR-1 | Central feed displays relevant news, media and local events |
| ----- | ----- |
| Relevant PUC | 1 |
| Description | Central feed is to be populated with relevant news, media and local events which have been posted recently and not yet shown. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | User opens the application or refreshes the main page for an updated view of the feed. |
| Output/response | User is able to view information about upcoming events and news items as well as media which may be of interest to the user.  |
| Functions performed | Application fetches and renders content relevant to the user by their location. |
| Verification | Simulate various scenarios for content to be displayed by creating events and posting updates for a created user at some location. |
| Relevant Design | EventsData, NewsStoriesData, NewsAndEventsFunctions, NewsFeedPage, UpcomingEventsPage, EventForm, NewsStoryForm |
| Relevant Code (Front) | NewsFeedPage.js, UpcomingEventsPage.js, MediaContentPage.js |
| Relevant Code (Back) | server.js, newsStory.js, events.js |

| ID: FR-2 | User is notified of all relevant upcoming local events |
| ----- | ----- |
| Relevant PUC | 2, 3, 4, 5 |
| Description | Every event which is sufficiently nearby to the user and close in the future should trigger an event notification from the application. |
| Conditions and constraints |User opted-in for location-based push notifications and gave the application permissions to always have access to user location, user has been authenticated, a current/recent user location is known, and posted events have a specified date/time and location. |
| Input/stimulus | Events have been posted which meet criteria (time, location) for a user to be notified. |
| Output/response | Event notifications are triggered and contain correct information in the notification content and the details page when opened. |
| Functions performed | Posted events are filtered by time and location for the user to be notified by the application about only the relevant ones. |
| Verification | Post multiple events and ensure that notifications are received for only the relevant events at the correct time and with correct event information shown. |
| Relevant Design | EventsData, NewsAndEventsFunctions, EventNotificationFunctions, EventNotificationFormat, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js |
| Relevant Code (Back) | server.js, events.js, notifications.js |

| ID: FR-3 | User is not notified of events outside geographic location |
| ----- | ----- |
| Relevant PUC | 2, 3, 4, 5 |
| Description | User should not be notified of events in a different province/territory/state or country or those outside a close radius, eg. 200km. |
| Conditions and constraints | User opted-in for location-based push notifications and gave the application permissions to always have access to user location, user has been authenticated, a current/recent user location is known, and posted events have a specified location. |
| Input/stimulus | Events have been posted that are outside the determined feasible radius from the user. |
| Output/response | No event notification is triggered. |
| Functions performed | The application determines that the event location is outside the feasible radius from the location of the user and the application prevents a notification by this criterion. |
| Verification | Post events that are outside the known location of a user and ensure that user is not notified of that event at any point. |
| Relevant Design | EventsData, NewsAndEventsFunctions, EventNotificationFunctions, EventNotificationFormat, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js |
| Relevant Code (Back) | server.js, events.js, notifications.js |

| ID: FR-4 | User is not notified of past events |
| ----- | ----- |
| Relevant PUC | 2, 3, 4, 5 |
| Description | User should not be notified of events which have a recorded end time in the past. |
| Conditions and constraints | User opted-in for location-based push notifications and gave the application permissions to always have access to user location, user has been authenticated, and posted events have a specified date and time. |
| Input/stimulus | Events have been posted with a recorded end date and time that has already passed. |
| Output/response | No event notification is triggered. |
| Functions performed | The application determines that the event has already finished and the application prevents a notification by this criterion. |
| Verification | Post events with a past date and ensure that user is not notified of that event at any point. |
| Relevant Design | EventsData, NewsAndEventsFunctions, EventNotificationFunctions, EventNotificationFormat, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js |
| Relevant Code (Back) | server.js, events.js, notifications.js |

| ID: FR-5 | User is not notified of events too far into the future |
| ----- | ----- |
| Relevant PUC | 2, 3, 4, 5 |
| Description | User should not be notified of events happening more than a reasonable about of time in the future, eg. 2 weeks. |
| Conditions and constraints | User opted-in for location-based push notifications and gave the application permissions to always have access to user location, user has been authenticated, and posted events have a specified date and time. |
| Input/stimulus | Events have been posted with a recorded end date and time that is more than a reasonable about of time in the future, eg. 2 weeks. |
| Output/response | No event notification is triggered. |
| Functions performed | The application determines that the event is too far in the future and the application prevents a notification by this criterion. |
| Verification | Post events happening far in the future and ensure that user is not yet notified. |
| Relevant Design | EventsData, NewsAndEventsFunctions, EventNotificationFunctions, EventNotificationFormat, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js |
| Relevant Code (Back) | server.js, events.js, notifications.js |

| ID: FR-6 | Correct event information shown in notification |
| ----- | ----- |
| Relevant PUC | 2, 3, 4 |
| Description | Notification content contains correct information about upcoming local event. |
| Conditions and constraints | User opted-in for location-based push notifications and gave the application permissions to always have access to user location, user has been authenticated, and posted events have a specified date and time. |
| Input/stimulus | Events have been posted with a recorded end date and time that within the correct time period and correct geographical location. |
| Output/response | Event notifications are triggered and contain the same information of the event posted from admin. |
| Functions performed | Posted events information is checked against the events information shown in the notification. |
| Verification | Post events within the 'current' time and check to see if notification is showing. If notification shows, check to see if the notification event information corresponds to what is within posted event. |
| Relevant Design | EventsData, NewsAndEventsFunctions, EventNotificationFunctions, EventNotificationFormat, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js |
| Relevant Code (Back) | server.js, events.js, notifications.js |

| ID: FR-7 | Correct event information shown on details page |
| ----- | ----- |
| Relevant PUC | 5 |
| Description | Correct information is displayed on page shown when event notification is opened. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application, and event shown in notification has details on location, date/time and description. |
| Input/stimulus | User opens a delivered event notification. |
| Output/response | User is able to view detailed information about the event from within the application. |
| Functions performed | Application loads detailed information pertaining to event displayed in opened notification and renders to user interface. |
| Verification | Ensure page loads and correct information is displayed once notification has been opened. |
| Relevant Design | EventsData, NewsAndEventsFunctions, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js |
| Relevant Code (Back) | server.js, events.js |

| ID: FR-8 | Administrator is able to see all events |
| ----- | ----- |
| Relevant PUC | 2, 3, 4, 5 |
| Description | In the admin page, the administrator should be able to see all events created. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | Administrator is on the admin events page. |
| Output/response | All events in the past and all events that have yet to happen should show on page. |
| Functions performed | Function requests information about events from database and populations it on the admin events page. |
| Verification | Go onto admin events page and check to see if all events are shown. Also check to see if the events within the database is showing up correctly in the admin events page. |
| Relevant Design | EventsData, NewsAndEventsFunctions, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js, EventForm.js |
| Relevant Code (Back) | server.js, events.js |

| ID: FR-9 | Administrator is able to new create event |
| ----- | ----- |
| Relevant PUC | 6 |
| Description | In the admin page, there needs to be a form for the admin to create an event. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | Admin fills out the event form and submits it. |
| Output/response | An in-app notification shows up indicating that the event has been submitted. The app sends the event data to the database. |
| Functions performed | In-app notification must be called indicating that the event has been submitted. The server must accept the request for event creation.  |
| Verification | Create an event in the admin page and see if the in-app notification shows up and check to see if event is now stored in database. |
| Relevant Design | EventsData, NewsAndEventsFunctions, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js, EventForm.js |
| Relevant Code (Back) | server.js, events.js |

| ID: FR-10 | Administrator is able to update event |
| ----- | ----- |
| Relevant PUC | 7 |
| Description | In the admin page, there needs to be a form for the admin to edit an event. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | The admin user clicks onto the event he/she would like to edit. A form should then pop up. The admin would then enter the correct information into the page and then submits it. |
| Output/response |  An in-app notification shows up indicating that the edited event has been submitted. The app sends the event data to the database. |
| Functions performed | In-app notification function must be called indicating that the edited event has been submitted. The server must accept the request for edit event. |
| Verification | Click into an event in the admin page. Then edit the event through the form. Check to see if the event is now stored in the database |
| Relevant Design | EventsData, NewsAndEventsFunctions, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js, EventForm.js |
| Relevant Code (Back) | server.js, events.js |

| ID: FR-11 | Administrator is able to delete/cancel event |
| ----- | ----- |
| Relevant PUC | 8 |
| Description | In the admin page, there needs to be a form for the admin to delete/cancel an event. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | The admin user first view all the events. The admin will click on the delete sign of the event he/she would like to delete. An 'are you sure?' in-app notification will appear. If the admin agrees, the event will be removed. |
| Output/response | The in-app notification will indicate that the event has been deleted. The event will also be removed from the database. |
| Functions performed | In-app notification function must be called indicating that the event has been deleted. The server must accept the request for deleted event and edit the database. |
| Verification | Delete an event. Check to see if the event is still stored in the database. |
| Relevant Design | EventsData, NewsAndEventsFunctions, UpcomingEventsPage, EventForm |
| Relevant Code (front) | UpcomingEventsPage.js, EventForm.js |
| Relevant Code (Back) | server.js, events.js |


| ID: FR-12 | Administrator is able to see all posts |
| ----- | ----- |
| Relevant PUC | 16, 17, 18 |
| Description | In the admin page, the administrator should be able to see all posts created. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | Administrator is on the admin posts page. |
| Output/response | All relevant posts should show on page. |
| Functions performed | Function requests information about posts from database and populations it on the admin posts page. |
| Verification | Go onto admin posts page and check to see if all posts are shown. Also check to see if the posts within the database is showing up correctly in the admin posts page. |
| Relevant Design | MediaContentData, MediaContentFunctions, MediaContentPage, MediaContentForm |
| Relevant Code (front) | MediaContentPage.js, MediaContentForm.js |
| Relevant Code (Back) | server.js, events.js, newsStory.js |

| ID: FR-13 | Administrator is able to new create post |
| ----- | ----- |
| Relevant PUC | 16 |
| Description | In the admin page, there needs to be a form for the admin to create a post. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | Admin fills out the post form and submits it. |
| Output/response | An in-app notification shows up indicating that the post has been submitted. The app sends the post data to the database. |
| Functions performed | In-app notification must be called indicating that the post has been submitted. The server must accept the request for post creation.  |
| Verification | Create a post in the admin page and see if the in-app notification shows up and check to see if post is now stored in database. |
| Relevant Design | MediaContentData, MediaContentFunctions, MediaContentPage, MediaContentForm |
| Relevant Code (front) | MediaContentPage.js, MediaContentForm.js |
| Relevant Code (Back) | server.js, events.js, newsStory.js |

| ID: FR-14 | Administrator is able to update post |
| ----- | ----- |
| Relevant PUC | 16 |
| Description | In the admin page, there needs to be a form for the admin to edit a post. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | The admin user clicks onto the post he/she would like to edit. A form should then pop up. The admin would then enter the correct information into the page and then submits it. |
| Output/response |  An in-app notification shows up indicating that the edited post has been submitted. The app sends the post data to the database. |
| Functions performed | In-app notification function must be called indicating that the edited post has been submitted. The server must accept the request for edit post. |
| Verification | Click into a post in the admin page. Then edit the post through the form. Check to see if the post is now stored in the database. |
| Relevant Design | MediaContentData, MediaContentFunctions, MediaContentPage, MediaContentForm |
| Relevant Code (front) | MediaContentPage.js, MediaContentForm.js |
| Relevant Code (Back) | server.js, events.js, newsStory.js |

| ID: FR-15 | Administrator is able to delete post |
| ----- | ----- |
| Relevant PUC | 16 |
| Description | In the admin page, there needs to be a form for the admin to delete a post. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | The admin user first view all the posts. The admin will click on the delete sign of the post he/she would like to delete. An 'are you sure?' in-app notification will appear. If the admin agrees, the post will be removed. |
| Output/response | The in-app notification will indicate that the post has been deleted. The post will also be removed from the database. |
| Functions performed | In-app notification function must be called indicating that the post has been deleted. The server must accept the request for deleted post and edit the database. |
| Verification | Delete a post. Check to see if the post is still stored in the database. |
| Relevant Design | MediaContentData, MediaContentFunctions, MediaContentPage, MediaContentForm |
| Relevant Code (front) | MediaContentPage.js, MediaContentForm.js |
| Relevant Code (Back) | server.js, events.js, newsStory.js |

| ID: FR-16 | User is able to view messages sent by other users |
| ----- | ----- |
| Relevant PUC | 10 |
| Description | In the Messaging page, users can view messages that are sent by others and himself/herself. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | Users enter into messenger page. |
| Output/response | Historical messages are shown. |
| Functions performed | A function that retrieves all historical messages from database and displays them. |
| Verification | Go onto the Messaging page and all the historical messages should show. |
| Relevant Design | MessagesData, MessagesFunctions, MessagesPage |
| Relevant Code (front) | MessagesPage.js |
| Relevant Code (Back) | server.js, messages.js |

| ID: FR-17 | User is able to send new public message |
| ----- | ----- |
| Relevant PUC | 11 |
| Description | In the Messaging page, users can send messages into the global chat. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | Users enter into Messaging page and type in a message. |
| Output/response | Message will show up in the global Messaging page and also sent to the database. |
| Functions performed | A function that will create a new message into the database and display it on the page. |
| Verification | Create a new message and check if new message is being displayed and also stored within database. |
| Relevant Design | MessagesData, MessagesFunctions, MessagesPage |
| Relevant Code (front) | MessagesPage.js |
| Relevant Code (Back) | server.js, messages.js |

| ID: FR-18 | Automated replies when no other users active |
| ----- | ----- |
| Relevant PUC | 12 |
| Description | In the Messaging page, if no other users are active, server will send a message to user indicating that no other users are active. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | User is in Messaging page and no other person is on the Messaging page. |
| Output/response | A message is sent personally to the user stating that there are no other users currently who are on the Messaging page. |
| Functions performed | A function that display a message to the user screen if there are no other users. |
| Verification | Enter into the page with no other person in the page and check to see if the message pops up. |
| Relevant Design | AccountsData, MessagesData, MessagesFunctions, AuthenticationFunctions, MessagesPage, AuthenticationPage |
| Relevant Code (front) | MessagesPage.js |
| Relevant Code (Back) | server.js, messages.js |

| ID: FR-19 | User is able to register new account |
| ----- | ----- |
| Relevant PUC | 13 |
| Description | In the Registration page, there is a form for users to register an account. Users will be able to create a new account. |
| Conditions and constraints | User has downloaded the app and is on the registration page. |
| Input/stimulus | User is in the Register page and fills in the registration form. The 'submit' button has been clicked. |
| Output/response | User information is checked against the database. If there are duplicate emails or usernames, the submission will be rejected. If all checks are successful, then the information will be stored into the database and the user will proceed into the main page. |
| Functions performed | There is a function to verify account information and then another function to store information correctly into database. |
| Verification | Go onto the forms page and create a new account. |
| Relevant Design | AccountsData, AuthenticationFunctions, AuthenticationPage |
| Relevant Code (front) | SettingsPage.js |
| Relevant Code (Back) | server.js, accounts.js |

| ID: FR-20 | User is able to sign into application |
| ----- | ----- |
| Relevant PUC | 14 |
| Description | In the Sign in page, there is a form for users to sign in to his/her account. |
| Conditions and constraints | User has downloaded the app and is on the sign in page. |
| Input/stimulus | User in the Sign in page and fills in the sign in form. The 'sign in' button has been clicked. |
| Output/response | User information is checked against the database. If the sign in information is incorrect, the sign in will be rejected. If all checks are successful, the user will proceed to main page. |
| Functions performed | There is a function to verify sign in information. |
| Verification | Go onto the sign in page and check the sign in with incorrect information. In this case, it should fail. Then check the sign in with correct information. In this case, it should succeed. |
| Relevant Design | EventsData, NewsAndEventsFunctions, UpcomingEventsPage |
| Relevant Code (front) | SettingsPage.js |
| Relevant Code (Back) | server.js, accounts.js |

| ID: FR-21 | Calendar contains all nearby upcoming events |
| ----- | ----- |
| Relevant PUC | 15 |
| Description | In the Calendar View page, there is a calendar that shows all the upcoming nearby events. |
| Conditions and constraints | If you are within a range of 200km to that event, you will be able to see the event within the calendar. |
| Input/stimulus | User goes into the Calendar View page. |
| Output/response | User should be able to see all upcoming events in his/her region in the calendar. |
| Functions performed | There is a function to check all upcoming events and their location. If the user is within the specified range, the function will return the information of the event to be shown in the calendar view. |
| Verification | Go onto the Calendar View page with your GPS at a specific location within 200km to those events. Check to see if that event is showing up in the calendar. If it is showing, the program is working correctly. |
| Relevant Design | EventsData, NewsAndEventsFunctions, UpcomingEventsPage |
| Relevant Code (front) | UpcomingEventsPage.js |
| Relevant Code (Back) | server.js, events.js |

| ID: FR-22 | Calendar omits far-away events |
| ----- | ----- |
| Relevant PUC | 15 |
| Description | In the Calendar View page, there is a calendar that will not show all upcoming events that the user is not nearby to. |
| Conditions and constraints | If you are outside of a range of 200km to that event, you will not be able to see the event within the calendar. |
| Input/stimulus | User goes into the Calendar View page outside of the range of an event |
| Output/response | The user should not be able to see that upcoming event that is outside of the range. |
| Functions performed | There is a function to check all upcoming events and their location. If the user is outside the specified range, the function will not return the information of the event to be shown in the calendar view. |
| Verification | Go onto the Calendar View page with your GPS outside of a specific location within 200km to certain events. Check to see if that event is showing up in the calendar. If it is not showing, the program is working correctly. |
| Relevant Design | EventsData, NewsAndEventsFunctions, UpcomingEventsPage |
| Relevant Code (front) | UpcomingEventsPage.js |
| Relevant Code (Back) | server.js, events.js |

| ID: FR-23 | Regular user is able to see relevant posts |
| ----- | ----- |
| Relevant PUC | 16, 17, 18 |
| Description | In the user feed, regular users should be able to see posts which are nearby and not yet shown to them in the application. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | User is on the user feed. |
| Output/response | All relevant posts should show on page. |
| Functions performed | Function requests information about posts from database and populations it on the user feed. |
| Verification | Go onto user feed and check to see if all posts are shown. Also check to see if the posts within the database is showing up correctly in the user feed. |
| Relevant Design | MediaContentData, MediaContentFunctions, MediaContentPage, MediaContentForm |
| Relevant Code (front) | UpcomingEventsPage.js |
| Relevant Code (Back) | server.js, events.js, newsStories.js |

| ID: FR-24 | Regular user is able to new create post |
| ----- | ----- |
| Relevant PUC | 17 |
| Description | In the user feed, there needs to be a form for the user to create a post. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | User fills out the post form and submits it. |
| Output/response | An in-app notification shows up indicating that the post has been submitted. The app sends the post data to the database. |
| Functions performed | In-app notification must be called indicating that the post has been submitted. The server must accept the request for post creation.  |
| Verification | Create a post in the user feed and see if the in-app notification shows up and check to see if post is now stored in database. |
| Relevant Design | MediaContentData, MediaContentFunctions, MediaContentPage, MediaContentForm |
| Relevant Code | MediaContentPage.js, MediaContentForm.js |

| ID: FR-25 | Regular user is able to update post |
| ----- | ----- |
| Relevant PUC | 17 |
| Description | In the user feed, there needs to be a form for the user to edit a post. |
| Conditions and constraints | The regular user is connected to the Internet, has been authenticated, and they are the originator of the post. |
| Input/stimulus | The user clicks onto the post he/she would like to edit. A form should then pop up. The user would then enter the correct information into the page and then submits it. |
| Output/response |  An in-app notification shows up indicating that the edited post has been submitted. The app sends the post data to the database. |
| Functions performed | In-app notification function must be called indicating that the edited post has been submitted. The server must accept the request for edit post. |
| Verification | Click into a post in the user page. Then edit the post through the form. Check to see if the post is now stored in the database |
| Relevant Design | MediaContentData, MediaContentFunctions, MediaContentPage, MediaContentForm |
| Relevant Code | MediaContentPage.js, MediaContentForm.js |

| ID: FR-26 | User is able to delete post |
| ----- | ----- |
| Relevant PUC | 17 |
| Description | In the user page, there needs to be a form for the user to delete a post. |
| Conditions and constraints | The regular user is connected to the Internet, has been authenticated, and they are the originator of the post. |
| Input/stimulus | The user first view all the posts. The user will click on the delete sign of the post he/she would like to delete. An 'are you sure?' in-app notification will appear. If the user agrees, the post will be removed. |
| Output/response | The in-app notification will indicate that the post has been deleted. The post will also be removed from the database. |
| Functions performed | In-app notification function must be called indicating that the post has been deleted. The server must accept the request for deleted post and edit the database. |
| Verification | Delete a post. Check to see if the post is still stored in the database. |
| Relevant Design | MediaContentData, MediaContentFunctions, MediaContentPage, MediaContentForm |
| Relevant Code | MediaContentPage.js, MediaContentForm.js |

| ID: FR-27 | User is able to share posts from other users |
| ----- | ----- |
| Relevant PUC | 9 |
| Description | Users should be able to share posts which they see by generating a shareable link. |
| Input/stimulus | User views content on pages such as event, news, photo, etc. on the application. User clicks the "Share" button below or beside the content they want to share. |
| Output/response | User can view content on the event and news, etc. pages of the application. After the "Share" button is clicked, the application generates a sharable link that the user can copy. |
| Functions performed | The application fetches content from the database on page load. For sharing content, the application generates and provides the sharable URL link for the content. |
| Verification | Test whether the user can see and copy the sharable link when the "Share" button is clicked. Test whether the generated link is correctly functional. |
| Relevant Design | MediaContentData, MediaContentFunctions, MediaContentPage, MediaContentForm |
| Relevant Code (front) | MediaContentPage.js, MediaContentForm.js |
| Relevant Code (back) | server.js, newsStory.js, events.js |

| ID: FR-28 | User is able to submit feedback |
| ----- | ----- |
| Relevant PUC | 20 |
| Description | User is able to submit feedback to be stored and visible to developers and maintainers. |
| Conditions and constraints | User is connected to the internet and has been authenticated within the application. |
| Input/stimulus | User opens, fills, and submits feedback form. |
| Output/response | Feedback is submitted and made visible to internal development team. |
| Functions performed | Feedback is stored into database with metadata about user and time submitted. |
| Verification | Submit feedback as regular user and ensure required data is stored in database. |
| Relevant Design | FeedbackData, FeedbackForm |
| Relevant Code | FeedbackForm.js |

| ID: FR-29 | Administrator is able to see all news stories |
| ----- | ----- |
| Relevant PUC | 2, 3, 4, 5 |
| Description | In the admin page, the administrator should be able to see all news stories created. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | Administrator is on the admin news stories page. |
| Output/response | All news stories in the past and all news stories that have yet to happen should show on page. |
| Functions performed | Function requests information about news stories from database and populations it on the admin news stories page. |
| Verification | Go onto admin news stories page and check to see if all news stories are shown. Also check to see if the news stories within the database is showing up correctly in the admin news stories page. |
| Relevant Design | NewsStoryData |
| Relevant Code (front) | NewsFeedPage.js, NewsStoryForm.js |
| Relevant Code (back) | server.js, newsStory.js |

| ID: FR-30 | Administrator is able to create news story |
| ----- | ----- |
| Relevant PUC | 6 |
| Description | In the admin page, there needs to be a form for the admin to create a news story. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | Admin fills out the news story form and submits it. |
| Output/response | An in-app notification shows up indicating that the news story has been submitted. The app sends the news story data to the database. |
| Functions performed | In-app notification must be called indicating that the news story has been submitted. The server must accept the request for news story creation.  |
| Verification | Create a news story in the admin page and see if the in-app notification shows up and check to see if news story is now stored in database. |
| Relevant Design | NewsStoryData |
| Relevant Code (front) | NewsFeedPage.js, NewsStoryForm.js |
| Relevant Code (back) | server.js, newsStory.js |

| ID: FR-31 | Administrator is able to update news story |
| ----- | ----- |
| Relevant PUC | 7 |
| Description | In the admin page, there needs to be a form for the admin to edit a news story. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | The admin user clicks onto the news story he/she would like to edit. A form should then pop up. The admin would then enter the correct information into the page and then submits it. |
| Output/response |  An in-app notification shows up indicating that the edited news story has been submitted. The app sends the news story data to the database. |
| Functions performed | In-app notification function must be called indicating that the edited news story has been submitted. The server must accept the request for edit news story. |
| Verification | Click into a news story in the admin page. Then edit the news story through the form. Check to see if the news story is now stored in the database |
| Relevant Design | NewsStoryData |
| Relevant Code (front) | NewsFeedPage.js, NewsStoryForm.js |
| Relevant Code (back) | server.js, newsStory.js |

| ID: FR-32 | Administrator is able to delete/cancel news story |
| ----- | ----- |
| Relevant PUC | 8 |
| Description | In the admin page, there needs to be a form for the admin to delete/cancel a news story. |
| Conditions and constraints | User is connected to the Internet and has been authenticated within the application. |
| Input/stimulus | The admin user first view all the news stories. The admin will click on the delete sign of the news story he/she would like to delete. An 'are you sure?' in-app notification will appear. If the admin agrees, the news story will be removed. |
| Output/response | The in-app notification will indicate that the news story has been deleted. The news story will also be removed from the database. |
| Functions performed | In-app notification function must be called indicating that the news story has been deleted. The server must accept the request for deleted news story and edit the database. |
| Verification | Delete a news story. Check to see if the news story is still stored in the database. |
| Relevant Design | NewsStoryData |
| Relevant Code (front) | NewsFeedPage.js, NewsStoryForm.js |
| Relevant Code (back) | server.js, newsStory.js |

### 3.3 Quality of Service

<!-- This section states additional, quality-related property requirements that the functional effects of the software should present. -->

#### 3.3.1 Performance

<!-- If there are performance requirements for the product under various circumstances, state them here and explain their rationale, to help the developers understand the intent and make suitable design choices. Specify the timing relationships for real time systems. Make such requirements as specific as possible. You may need to state performance requirements for individual functional requirements or features. -->

The page is required to load and refresh in less than 0.5 seconds.
Upon receiving new data feed, a user's feed should reflect any changes within 0.5 seconds after submission.
User's should be able to navigate between pages within 0.5 seconds.
Slowest page load cannot take more than 4 seconds.
This is with the assumption of good Internet speed, with download speed of over 10MB/s and an upload speed of over 5MB/s.
Consistency between response time in the application is also required, therefore there all response time should be less than 4 seconds for 95% of interactions.
This requirement is an important non-functional requirement since it will ensure that users have a pleasant experience while utilizing the platform.
Long load times are dissatisfying and can deter users from returning to the application.

Under a system crash, or if the user unexpectedly disconnects from the server, the user's last state of data should be saved.
This is an important requirement since users will still be able to return to their previous state of use and continue where they left off in the event of a system crash or unexpected disconnection to the server.

Users are required to be using internet speeds supporting 10 Mbps (Megabits per second) download speeds and at least 3 Mbps upload speeds.
This is important since it will also ensure users have the adequate connection to communicate with the website server.

The application should be able to handle up to 10 000 read transactions per hour and up to 4000 write/update transactions per hour.
Handling heavy workload is important and the database will need to be able to handle large amount of workload for many users using the platform at once.

#### 3.3.2 Security

<!-- Specify any requirements regarding security or privacy issues surrounding use of the product or protection of the data used or created by the product. Define any user identity authentication requirements. Refer to any external policies or regulations containing security issues that affect the product. Define any security or privacy certifications that must be satisfied. -->

Security:

- Users must log in to their accounts with a valid username and password.  If a user attempts to sign in for the first time using a new mobile device or tablet, Two-Factor Authentication is required to ensure it is the rightful owner of the account signing up.
- Any personal data must be stored encrypted and no plaintext account information is stored on the application.
- The application must disclose its use of cookies.
- The database is backed up regularly, (once a day) to avoid data loss and ensure the availability and integrity of data. The backups must be stored in a secure location with strict access control. In the case of data deletion or corruption, the backups will be used to recover data.

Privacy:

- Users will be signing up using their personal information to communicate with other members. They will also be using a personal email which may be also used for other personal purposes.
- It is required that users cannot see or obtain any other users' personal information.
- All personal information must be kept confidential.
- User data is sensitive information and cannot be sold or utilized by other third parties for any purposes.
- The user must be cautioned about their own data safekeeping at least in one point of time to prevent intrusion of their account.
- The application must disclose it will collect and maintain personal information.
- A Terms and Conditions will be required to be read before the user creates an account. The Terms and Conditions will contain our Privacy Statement.
- The privacy statement will state that we do collect information such as all interactions and data created in this application. This data will not be used for sale
- The application give control to end-users over private data.

The application is required to comply with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and a PIPEDA privacy certifications is required.

#### 3.3.3 Reliability

<!-- Specify the factors required to establish the required reliability of the software system at time of delivery. -->

- The application is required to be fully operational and meeting all non-functional requirements when more than 1000 users are on the application at once for at least 24 hours.
- The application should only fail <1hr/month.
- There should be less than a 2% chance that the application will fail.
- The application should observe no more than 1 event of unexpected behaviour per 100 interactions per user. (Rate of Failure Occurrence)
- The mean time between failures should be no less than 2 hours.
- The application is required not to fail or observe unexpected behaviour with any combination of inputs.
- The application should be able to recover without operator intervention.
- The application should be able to recover without corrupting any user saved data in the database for at least 100 consecutive crashes.

#### 3.3.4 Availability

<!-- Specify the factors required to guarantee a defined availability level for the entire system such as checkpoint, recovery, and restart. -->

- The application is required to have an availability uptime of 98%. The remaining time is allowed for maintenance time and updates.
- The system is required to continue operating if one server is down, the rest of the servers can run independent of one another.
- Rolling updates are required in order to minimize downtime.

To guarantee high availability, we will run our service on well-known cloud service providers such as Amazon Web Services.
Amazon will ensure that the application can scale when necessary.

### 3.4 Compliance

<!-- Specify the requirements derived from existing standards or regulations, including:

- Report format
- Data naming
- Accounting procedures
- Audit tracing

For example, this could specify the requirement for software to trace processing activity. Such traces are needed for some applications to meet minimum regulatory or financial standards. An audit trace requirement may, for example, state that all changes to a payroll database shall be recorded in a trace file with before and after values. -->

Accessibility compliances are not required for private organizations with less than 50 employees. Therefore, no accessibility compliances are required for this system [1]. Compliance with the Google Play Store and Apple App store is mandatory in order to be published on those platforms.

A full list of compliance expectations is outlined by the Google Play Store and Apple App Store guidelines:

- <https://support.google.com/googleplay/android-developer/answer/9893335?hl=en&ref_topic=9877766>
- <https://support.google.com/googleplay/android-developer/answer/9888076>
- <https://support.google.com/googleplay/android-developer/answer/10144311>
- <https://support.google.com/googleplay/android-developer/answer/9876714?hl=en&ref_topic=9877065>
- <https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage>

### 3.5 Design and Implementation

#### 3.5.1 Installation

<!-- Constraints to ensure that the software-to-be will run smoothly on the target implementation platform. -->

- The system is required to install within 10 minutes of submitting an installation request.
- The application will be installed through the Google Play Store or the Apple App Store.

#### 3.5.2 Distribution

<!-- Constraints on software components to fit the geographically distributed structure of the host organization, the distribution of data to be processed, or the distribution of devices to be controlled. -->

Software components are not to be distributed to outside third parties without consent of the capstone team.

#### 3.5.3 Maintainability

<!-- Specify attributes of software that relate to the ease of maintenance of the software itself. These may include requirements for certain modularity, interfaces, or complexity limitation. Requirements should not be placed here just because they are thought to be good design practices. -->

- Bug tracking tools are required to be used with the application in order to document and be able to reproduce and debug bugs.
- Software components are required to have at least 1 component per front end and back end of application.
- Updates are required to be installed in no more than 10 minutes.
- An interface with the database is required.

#### 3.5.4 Reusability

<!-- TODO: come up with a description -->

- No requirements on software reusability.

#### 3.5.5 Portability

<!-- Specify attributes of software that relate to the ease of porting the software to other host machines and/or operating systems. -->

- The mobile application is required to work across all Android operating systems supporting Android 6.0 or later.
- The mobile application is required to work across all iOS devices supporting iOS 7 or later.
- The mobile application should not support porting from Android to iOS or vice versa.
- The web application required to support and work across all Google Chrome, Safari, Firefox and Opera Browser and should work from browser to browser on any one device on either Android 6.0 and later or iOS 7 and later.

#### 3.5.6 Cost

<!-- Specify monetary cost of the software product. -->

The budget constraint for the project is $800. It will be used to purchase external assets such as a database server and pay app store fees.

Estimation: 1000 users, 200 daily active users

AWS EC2 - $5USD a month [2]

#### 3.5.7 Deadline

<!-- Specify schedule for delivery of the software product. -->

Prototype 1.0: Oct 28
Prototype 2.0: Nov 25
Final Version: Jan 7

#### 3.5.8 Proof of Concept

<!-- TODO: come up with a description -->

Project metrics are required to quantify a successful or failure in feasibility. Users and stakeholders are required inputs to validate the feasibility of the concept.

## 4. Verification

<!-- This section provides the verification approaches and methods planned to qualify the software. The information items for verification are recommended to be given in a parallel manner with the requirement items in Section 3. The purpose of the verification process is to provide objective evidence that a system or system element fulfills its specified requirements and characteristics. -->

<!-- TODO: give more guidance, similar to section 3 -->
<!-- ieee 15288:2015 -->

Testing will be conducted iteratively during development of each feature of the application to quickly identify issues in an agile manner.
Preliminary testing will be done internally by the developers using the techniques outlined with each functional requirement.
Non-functional requirements will be evaluated by non-customer stakeholders including the developers, the client/supervisor, and teaching staff from the Capstone course at McMaster University.
Prototype versions will be tested and evaluated by the client who will deliver feedback to be incorporated into the next version.

Shown here, for quick reference, are the testing methods for each functional requirement as stated in Section 3.2 (Functional Requirements).

| FR ID and Name | Verification Method |
| ----- | ----- |
| FR-1 (Central feed displays relevant news, media and local events) | Simulate various scenarios for content to be displayed by creating events and posting updates for a created user at some location. |
| FR-2 (User is notified of all relevant upcoming local events) | Post multiple events and ensure that notifications are received for only the relevant events at the correct time and with correct event information shown. |
| FR-3 (User is not notified of events outside geographic location) | Post events that are outside the known location of a user and ensure that user is not notified of that event at any point. |
| FR-4 (User is not notified of past events) | Post events with a past date and ensure that user is not notified of that event at any point. |
| FR-5 (User is not notified of events too far into the future) | Post events happening far in the future and ensure that user is not yet notified. |
| FR-6 (Correct event information shown in notification) | Post events within the 'current' time and check to see if notification is showing. If notification shows, check to see if the notification event information corresponds to what is within posted event. |
| FR-7 (Correct event information shown on details page) | Ensure page loads and correct information is displayed once notification has been opened. |
| FR-8 (Administrator is able to see all events) | Go onto admin events page and check to see if all events are shown. Also check to see if the events within the database is showing up correctly in the admin events page. |
| FR-9 (Administrator is able to new create event) | Create an event in the admin page and see if the in-app notification shows up and check to see if event is now stored in database. |
| FR-10 (Administrator is able to update event) | Click into an event in the admin page. Then edit the event through the form. Check to see if the event is now stored in the database. |
| FR-11 (Administrator is able to delete/cancel event) | Delete an event. Check to see if the event is still stored in the database. |
| FR-12 (Administrator is able to see all posts) | Go onto admin posts page and check to see if all posts are shown. Also check to see if the posts within the database is showing up correctly in the admin posts page. |
| FR-13 (Administrator is able to new create post) | Create a post in the admin page and see if the in-app notification shows up and check to see if post is now stored in database. |
| FR-14 (Administrator is able to update post) | Click into a post in the admin page. Then edit the post through the form. Check to see if the post is now stored in the database. |
| FR-15 (Administrator is able to delete post) | Delete a post. Check to see if the post is still stored in the database. |
| FR-16 (User is able to view messages sent by other users) | Go onto the Messaging page and all the historical messages should show. |
| FR-17 (User is able to send new public message) | Create a new message and check if new message is being displayed and also stored within database. |
| FR-18 (Automated replies when no other users active) | Enter into the page with no other person in the page and check to see if the message pops up. |
| FR-19 (User is able to register new account) | Go onto the forms page and create a new account. |
| FR-20 (User is able to sign into application) | Go onto the sign in page and check the sign in with incorrect information. In this case, it should fail. Then check the sign in with correct information. In this case, it should succeed. |
| FR-21 (Calendar contains all nearby upcoming events) | Go onto the Calendar View page with your GPS at a specific location within 200km to those events. Check to see if that event is showing up in the calendar. If it is showing, the program is working correctly. |
| FR-22 (Calendar omits far-away events) | Go onto the Calendar View page with your GPS outside of a specific location within 200km to certain events. Check to see if that event is showing up in the calendar. If it is not showing, the program is working correctly. |
| FR-23 (Regular user is able to see relevant posts) | Go onto user feed and check to see if all posts are shown. Also check to see if the posts within the database is showing up correctly in the user feed. |
| FR-24 (Regular user is able to new create post) | Create a post in the user feed and see if the in-app notification shows up and check to see if post is now stored in database. |
| FR-25 (Regular user is able to update post) | Click into a post in the user page. Then edit the post through the form. Check to see if the post is now stored in the database. |
| FR-26 (User is able to delete post) | Delete a post. Check to see if the post is still stored in the database. |
| FR-27 (User is able to share posts from other users) | Test whether the user can see and copy the sharable link when the "Share" button is clicked. Test whether the generated link is correctly functional. |
| FR-28 (Modern interface for current website) | Internal and client testing to determine subjective satisfaction from users of website. |
| FR-29 (Retain or expand existing functionality of current website) | Internal and client testing of website to ensure previous functionality is there and intended improvements have been effective. |
| FR-30 (User is able to submit feedback) | Submit feedback as regular user and ensure required data is stored in database. |
