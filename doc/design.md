# Design Document

<!--
Or more precisely: architecture and module design.

You will refine your SRS into something that better describes the software that you will (or ought to) implement. Of course, you should incorporate the lessons learned through implementing your prototype in here.

Marks will be allocated for completeness, meaning that your design document adequately covers everything that was discussed in your SRS.
This will also be tied to traceability: your explicitly linking of design points to particular parts of the SRS.
In other words, it is up to you to provide explicit evidence of completeness, not up to us to do the work to verify it; we will be auditing your document, not verifying it.

There is no specific format for this document.
However, some recommendations:

 - This is best done using a Wiki, that can link directly to the SRS
 - A lot of the information is best presented using various tabular formats
 - You should be linking to the appropriate literature when documenting your concepts.
 - Doing this assignment is time-consuming. It will take you more than 1 day per person per team.
 
Chapter 4 of the CS 2ME3 textbook is the perfect reference for all of this material.

Marking: (10)
 - (5) Spelling and grammar
 - (5) Consistency & style

Relevant textbook sections for reference: ?
-->

## For Eruku Mesi North America

Version 0.1  
Prepared by Darren Tu, Immanuel Odisho, Sophia Ji Who Choi and Sujan Kandeepan  
McMaster University  
Wednesday, November 18, 2020

## Table of Contents

- [Design Document](#design-document)
  - [For Eruku Mesi North America](#for-eruku-mesi-north-america)
  - [Table of Contents](#table-of-contents)
  - [1. Likely Changes](#1-likely-changes)
  - [2. Unlikely Changes](#2-unlikely-changes)
  - [3. Concepts](#3-concepts)
  - [4. Module Secrets](#4-module-secrets)
    - [4.1 Data Module Secrets](#41-data-module-secrets)
    - [4.2 Algorithm Module Secrets](#42-algorithm-module-secrets)
    - [4.3 Interface Module Secrets](#43-interface-module-secrets)
  - [5. Module Interface](#5-module-interface)
    - [5.1 Data Module Interface](#51-data-module-interface)
    - [5.2 Algorithm Module Interface](#52-algorithm-module-interface)
    - [5.3 Interface Module Interface](#53-interface-module-interface)
  - [6. SRS Changes](#6-srs-changes)
  - [7. Dependency Diagram](#7-dependency-diagram)
  - [8. Significant Design](#8-significant-design)

## 1. Likely Changes

<!--
A list of anticipated changes (and its rationale).
  These are the things that might change in the future, either during your implementation, or in some potential future life for your project.
  Common items here are a) data representation, b) behaviour, c) hardware specifics, d) configuration, e) security requirements.
  There are, of course, many more categories, the above are just for illustration.
  The rationale should trace back to the SRS (hopefully with explicit links).

Marking: (20)
 - (5) Meaningful changes - for properly naming and enumerating them
 - (10) Adequate rationale - the reason they exist
 - (5) Traceability - link to SRS

Relevant textbook sections for reference: 4.1.1, 4.2.2.3, 4.2.5, ?

| (Type of change) | (Short descriptive name of change) |
| --- | --- |
| Description | (Provide more details on the change itself) |
| Rationale | (Explain why it would be a likely change) |
| Link to SRS | (Section/item number within SRS document) |
 -->

| Data representation | Algorithm used for displaying live feed |
| --- | --- |
| Description | Changing the algorithm used to display the live feed to display news, media, and local event to users. |
| Rationale | Since this is a core feature of the application, the optimization of this algorithm is critical. Therefore, it is reasonable to expect changes to occur as it is being optimized. |
| Link to SRS | 3.2 Functional Requirements - ID: FR-1  |

| Data representation | Database schema for media content |
| --- | --- |
| Description | Changing the specific record fields for every media content item to include more metadata. |
| Rationale | Specifics such as supported file types and how users will view and interact with media content are still being decided, so the database schema may need to be adapted. |
| Link to SRS | 3.2 Functional Requirements ID: FR-12, ID: FR-13, ID: FR-14, ID: FR-15 |

| Data representation | Database schema for events and event notifications |
| --- | --- |
| Description | Changing the specific record fields for every event item and associated notification content if more event information can be provided. |
| Rationale | In case more relevant information for events becomes available in a later event instance, or it is decided that notifications should display more content, fields may be added to accommodate this. |
| Link to SRS | 3.2 Functional Requirements ID: FR-2, ID: FR-3, ID: FR-4, ID: FR-5, ID: FR-6 |

| Data representation | Database schema for messaging |
| --- | --- |
| Description | Changing the specific record fields for messages include more metadata, or to restructure the organization and visibility of messages which are currently to be shared publicly within a common thread. |
| Rationale | Messaging is currently to take place within a common thread which all users can view and reply to, but it may be possible to later incorporate multiple chat rooms or direct messaging if time permits, so the database schema would then require changes. |
| Link to SRS | 3.2 Functional Requirements ID: FR-16, ID: FR-17, ID: FR-18 |

| Functionality| Chatbot Interaction In the messaging page  |
| --- | --- |
| Description | In the messaging page of the app, introduce a chatbot to automatically respond to frequently asked questions and questions related to upcoming local events when no other users are active. |
| Rationale  | Since the chatbot integration can assist users when no other users are active, the behaviour of the messaging function is likely to change. |
| Link to SRS | 3.2 Functional Requirements - ID: FR-18  |

| Scheduling policies | Scheduling of posts from users |
| --- | --- |
| Description | Multiple users will be posting to the server at the same time. |
| Rationale | The scheduling algorithm is likely to change over time since it is uncertain what information should be prioritized. For example, this data can be prioritized based on a first in first displayed or it can be based on other factors such as popularity surrounding posts. |
| Link to SRS | 3.2 Functional Requirements ID: FR-24|

| Scheduling policies | Scheduling of shared posts|
| --- | --- |
| Description | Multiple users will be sharing posted data to the server at any  time. |
| Rationale | Since users will be posting data and be able to share it, the scheduling policy regarding how posts and sharing of posts should be prioritized amongst one another. For example, if a user makes a post and it is shared, the user may see the same post more than once. |
| Link to SRS | 3.2 Functional Requirements ID: FR-27|

|  Algorithmic Policies | Lazy versus Eager Approach |
| --- | --- |
| Description | Users feed can be computed and displayed in a lazy or eager approach, that is, it can be sorted in a specified manner at all times and instantly displayed (eager) or it can be sorted only once the user has requested it to be displayed (lazy). |
| Rationale | Since user experience is very important for user retention, it is imperative that user requests must be filled promptly. The policies surrounding displaying data to users is likely to change since it must be optimized.  |
| Link to SRS | 3.2 Functional Requirements ID: FR-27|

| Encapsulation | Information hiding of user post creation, update, and deletion |
| --- | --- |
| Description | User interface with posts will be encapsulated via information hiding. |
| Rationale | This is likely to change since the interface between users and their posts is likely to change depending on the front end appearance of the website and may or may not require more or less information to be hidden from the user and their posts. |
| Link to SRS | 3.2 Functional Requirements ID: FR-25, ID: FR-26, ID: FR-27 |

| Encapsulation | Information hiding of administrator event creation, update and deletion |
| --- | --- |
| Description | Administrator interface with events will be encapsulated via information hiding. |
| Rationale | This is likely to change since the interface between users and their events is likely to change depending on the front end appearance of the website and may or may not require more or less information to be hidden from the Administrator and their events. |
| Link to SRS | 3.2 Functional Requirements ID: FR-9, ID: FR-10, ID: FR-11 |

| Scheduling policies | Administrator view of events |
| --- | --- |
| Description | Administrator scheduling policy for viewing all events in the software system. |
| Rationale | Since administrator will be viewing events that are subject to change, the scheduling policies regarding how the events are to be displayed to the user are likely to change |
| Link to SRS | 3.2 Functional Requirements ID: FR-8|

| Scheduling policies | User Notifications |
| --- | --- |
| Description | User notifications are custom and time-sensitive.  |
| Rationale | Since users will be receiving notifications that are custom to their preferences, the scheduling policies regarding how and which notifications are sent to users is likely to change over time in order to optimize the user experience. |
| Link to SRS | 3.2 Functional Requirements ID: FR-2|

## 2. Unlikely Changes

<!--
A list of unlikely changes (and rationale).
  These are the things that are basically imposed on you externally.
  They can be in all the same categories as the anticipated changes but, for one reason or another (that you should document), will not change.
  These are things that you can rely on.
  The rationale should trace back to the SRS (hopefully with explicit links).

Marking: (10)
 - (3) Meaningful changes - for properly naming and enumerating them
 - (5) Adequate rationale - the reason they exist
 - (2) Traceability - link to SRS

Relevant textbook sections for reference: 4.1.1, 4.2.2.3, 4.2.5, ?

| (Type of change) | (Short descriptive name of change) |
| --- | --- |
| Description | (Provide more details on the change itself) |
| Rationale | (Explain why it wouldn't be a likely change) |
| Link to SRS | (Section/item number within SRS document) |
 -->

| Social Change | Any software related changes to the law or regulation changes  |
| --- | --- |
| Description | Social changes that may influence the compliance of our software with regulatory bodies. |
| Rationale | There are currently no software related laws that are expected to be changed shortly. This is because there are currently no software regulations or compliances being discussed amongst government bodies.  |
| Link to SRS | 3.4 Compliance|

| Abstract machine | Any change relating to the machine running the software. |
| --- | --- |
| Description | The machine that will be running the software is unlikely to change. |
| Rationale | The mobile devices and computers running this software are unlikely to change since we are utilizing high-level languages that use various methods of abstraction to be computable across multiple machines. These high-level languages and cross-platform frameworks (React-Native) allow this to be possible and thus, make it unlikely that the abstract machine running the software will change. |
| Link to SRS | 2.5 Assumptions and Dependencies |

| Implementation | Framework and source code languages used for implementation |
| --- | --- |
| Description | Programming languages and frameworks used to implement the algorithm and interface modules and functions of this application are unlikely to change. |
| Rationale | Refactoring an entire application to use a new language is incredibly difficult and time-consuming to do without causing a regression, so development of this application will likely proceed through maintenance of the current source code. |
| Link to SRS | 3.1.3 Software Interfaces |

| Data representation | Change of database management system (DBMS) |
| --- | --- |
| Description | Any change relating to the database management system used for data in the software system. |
| Rationale | Database management systems are well researched and documented pieces of software. Since the type of data we are storing and manipulating is unlikely to change the database management system utilized is unlikely to be changed. |
| Link to SRS | 3.1.3 Software Interfaces |

| Development | Change of software development cycle and release schedule |
| --- | --- |
| Description | Maintenance of the application is expected to continue at the current pace with a similar release schedule and software development methodologies as currently being done. |
| Rationale | Software maintenance is a large expectation in many projects and is unlikely to be any different for this software project. Perfect bug-free code is unlikely, so continued maintenance will be needed even after the Capstone term is over. |
| Link to SRS | 3.5.3 Maintainability |

## 3. Concepts

<!--
A list of concepts pertaining to your problem domain, and whether these concepts are design-time entities or run-time entities.
  For example, if 'sorting' was an important item in your problem domain, then 'permutations' would be an important concept too; however, it is extremely unusual for permutations to exist in code, they are a design-time concept in most sorting algorithms.
  In the same domain, comparison functions are another concept, but needs to exist at run-time (when sorting proper names or addresses, the comparison functions involved are highly non-trivial if one is to respect usual conventions).
  There will be overlap between these and points 1-2 above.

Marking: (10)
 - (5) Meaningful concepts and definitions
 - (5) Run and/or design time

Relevant textbook sections for reference: ?

| (Design or run time) | (Short descriptive name of concept) |
| --- | --- |
| Description | (Explain the concept in sufficient detail) |
| Rationale | (Explain relevance of this concept) |
 -->

| Design-time | Database CRUD operations |
| --- | --- |
| Description | Database manipulation generally involves CREATE, READ, UPDATE, and DELETE (CRUD) operations by which database queries tend to fall under one of these four categories. CREATE operations add new records to the database, READ operations return records without modifying information, UPDATE operations modify existing records, and DELETE operations delete existing records. Functions are often exposed by modules which contain and represent data, providing an interface for other modules to perform CRUD operations on relevant data without modifying data directly, and hiding query processing logic as well as the structure of the underlying database. |
| Rationale | Several features and components of the application have some dependency on data within permanent storage and will require a means of interacting with that data. The concept of CRUD operations helps conceptualize the types of database queries that are appropriate and help determine the necessary exported functions for modules that contain and represent this data. |

| Design-time | Searching within collections |
| --- | --- |
| Rationale | Searching is generally useful for selecting a particular record containing information which is either requested by the user or otherwise appropriate to be displayed. For example, delivering an event notification using the returned result from searching within stored data for information regarding that event, and addressing the problem space where a user expects to be notified of relevant events with correct information and stay connected with their community. |

| Design-time | Filtering collections |
| --- | --- |
| Description | Similar to searching but now returning a subsequence of the collection where an element is contained if and only if it satisfies the given predicate used for filtering the collection. |
| Rationale | Filtering serves to limit what the user sees to only that information which is relevant to them. For example, seeing news stories which they may be interested in, thereby addressing their needs by keeping them informed on only relevant stories. |

| Design-time | Sorting collections |
| --- | --- |
| Description | Given an unsorted collection of items, using a comparison function to define how items are to be ordered, produce an ordered collection of items arranged by the defined ordering. |
| Rationale | Sorting is useful for arranging information in an order of priority as the user would find appropriate, an example being for users to see the most recent posts and events first so they are updated first on those which are most current. |

| Run-time | Hashing functions and salting |
| --- | --- |
| Description | Password salts are pieces of data that are added to every password before hashing. A hash function is essentially a map between an arbitrary length string to a fixed-length string. Every time you enter the same arbitrary string in the hash, you will receive the same fixed length string. The hashed password will be the password stored in our database.  |
| Rationale | Hashing and salting can drastically improve the security of our data. If our data gets compromised, it will take the hacker an extremely long time to know what the real content of the data is.  |

| Run-time | User input form validation |
| --- | --- |
| Description | User input form interfaces should generally perform some amount of validation to ensure that user-entered data is valid and presumably correct. This is often done on the client-side, before submitting data to the server, by reading values from form input fields and display errors with feedback if one or more issues exist in the data. |
| Rationale | User input form validation ensures that no invalid information is stored in the database and that the user receives feedback when they attempt to submit a form with bad input values. This is required in several components of the application where the user is asked to provide information manually, such as personal information, details for news and events, files with titles and captions to be posted, and user feedback. |

| Run-time | Predicates for searching and filtering |
| --- | --- |
| Description | A predicate defines a criterion on which an item is to be included in a filtered list or selected when searching, in the form of a truth value with respect to any given item in a collection. |
| Rationale | This is the corresponding run-time concept for searching and filtering, where there may be some criteria by which the application needs to display information to the user and exclude the rest. An example is whether or not events taking place are happening in Los Angeles if the user is living in Los Angeles and interested in events nearby.  |

| Run-time | Comparison functions for sorting |
| --- | --- |
| Description | A comparison function determines, by some criteria, whether an object comes before or after another object in an ordered collection, or if the two can be considered equal. |
| Rationale | This is the corresponding run-time concept for sorting, where there may be some criteria by which the application needs to prioritize information to be displayed. An example is determining whether a post with media content has been posted before or another post, to display the earliest posts first if a user wishes to ensure they have not missed any, considering that they are interested in all updates from within their community. |

## 4. Module Secrets

<!--
A list of modules and the secret(s) that each module hides from the rest of the implementation.
  Your modules should be derived from the information in 1-3 above.
  Each module will own a certain idea, that it will keep secret from the rest of the implementation.

Marking: (20)
- (5) Module list - naming them
- (10) Adequate secret - explaining their secret
- (5) Traceability - why do they exist?

Relevant textbook sections for reference: 4.2.2.2, ?

| (Name of module) | (Brief description and here are more words to give an idea about table proportions) |
| --- | --- |
| Dependencies | (List any modules it has a USES relation to) |
| Implementation | (Internal low-level implementation details) |
| Module secrets | (List of things kept secret from other modules) |
| Rationale | (Explain why it exists with direct links to SRS) |

List of modules (functions/class components in camelCase/PascalCase):

- Data modules (store and provide information)
  - Events (EventsData)
    - Create new event record (createEvent)
    - Update existing event record (updateEvent)
    - Delete event record (deleteEvent)
    - Fetch event record (getEvent)
    - Fetch all events (getAllEvents)
  - News stories (NewsStoriesData)
    - Create new news story record (createNewsStory)
    - Update existing news story record (updateNewsStory)
    - Delete news story record (deleteNewsStory)
    - Fetch news story record (getNewsStory)
    - Fetch all news stories (getAllNewsStories)
  - User accounts/info (AccountsData)
    - Record new account upon creation (createAccount)
    - Modify account information (updateAccount)
    - Get account information (getAccount)
  - Messages shared in chat (MessagesData)
    - Save new message sent by user (saveMessage)
    - Fetch message record (getMessage)
    - Fetch all messages (getAllMessages)
  - Media content uploaded (MediaContentData)
    - Store media content record (saveMediaContent)
    - Update media content record (updateMediaContent)
    - Delete media content record (deleteMediaContent)
    - Fetch media content record (getMediaContent)
    - Fetch all media content (getAllMediaContent)
  - User feedback (FeedbackData)
    - Store user feedback record (saveFeedback)
    - Get all user feedback (getAllFeedback)
- Algorithm modules (aggregate data, conditional logic)
  - News and events functions (NewsAndEventsFunctions)
    - Fetch all news and events (fetchNewsEvents)
    - Filter news and events by location (filterNewsEventsByLocation)
    - Filter news and events by date/time (filterNewsEventsByDateTime)
    - Sort news and events by earliest/latest (sortNewsEventsByTime)
    - Generate link to share event (getEventLink)
    - Generate link to share news story (getNewsStoryLink)
  - Event notifications (EventNotificationFunctions)
    - Schedule notifications (scheduleNotifications)
    - Event notification delivery (deliverNotification)
    - Link notification to event record (getEventFromNotification)
    - Fetch/filter daily events for calendar (organizeEventsCalendar)
  - Messaging (MessagesFunctions)
    - Sort messages by timestamp (organizeMessages)
    - Generated automated response to message (generateAutoMessageResponse)
    - Determine if automated response needed (autoMessageResponseNeeded)
  - Media content functions (MediaContentFunctions)
    - Fetch all media content (fetchMediaContent)
    - Filter media content by location (filterMediaContentByLocation)
    - Filter media content by date/time (filterMediaContentByDateTime)
    - Sort media content by earliest/latest (sortMediaContentByTime)
    - Generate link to media content (getMediaContentLink)
  - Authentication (AuthenticationFunctions)
    - Existing user authentication (authenticateUser)
- Interface modules (front-end rendering)
  - News and events feed (NewsAndEventsPage)
    - Display news and events (displayNewsAndEvents)
  - Event notification layout (EventNotificationFormat)
    - Format notification (formatNotification)
  - Events calendar interface (EventsCalendarPage)
    - Display events calendar (displayEventsCalendar)
  - Event posting input form (EventForm)
    - Display form for event posting (displayEventForm)
    - Input form validation for event posting (validateEventForm)
  - News story posting input form (NewsStoryForm)
    - Display form for news story posting (displayNewsStoryForm)
    - Input form validation for news story posting (validateNewsStoryForm)
  - Messaging/chat interface (MessagesPage)
    - Display messages (displayMessages)
  - Media content feed (MediaContentPage)
    - Display media content page (displayMediaContent)
  - Media content upload interface (MediaContentForm)
    - Display form for media content posting (displayMediaContentForm)
    - Input validation for media content upload (validateMediaContentForm)
  - Authentication interface (AuthenticationForm)
    - Display form for account setup (displayAccountForm)
    - New user account creation form validation (validateAccountForm)
  - User feedback input form (FeedbackForm)
    - Display form for user feedback posting (displayFeedbackForm)
    - Input validation for user feedback form (validateFeedbackForm)
  - CRUD options for each of the above
  - Router/navigation between pages
-->

### 4.1 Data Module Secrets

| EventsData | Store and provide information for events |
| --- | --- |
| Dependencies | None |
| Implementation | Database storage for events with records containing event name, description, date/time, location provided by the organizers |
| Module secrets | Database service and schema used for storage |
| Rationale | Centralized datastore for event posting, notifications, and display within application as outlined in PUC 1-8 and FR 1-11 from SRS |

| NewsStoriesData | Store and provide information for news stories |
| --- | --- |
| Dependencies | None |
| Implementation | Database storage for news with records containing name, content, date provided by the admin. Functions for CRUD operations on News will be created |
| Module secrets | Database service and schema used for storage |
| Rationale | PUC NUM-1; FR 1 |

| AccountsData | Store and provide information for user accounts |
| --- | --- |
| Dependencies | None |
| Implementation | Database storage for accounts with records containing account information. Functions for CRUD operations on Accounts will be created |
| Module secrets | Database service and schema used for storage |
| Rationale | PUC Num 13-14; FR 18-19 |

| MessagesData | Store and provide information for messages |
| --- | --- |
| Dependencies | None |
| Implementation | Database storage for messages with records containing messages information. Functions for CRUD operations on Messages will be created |
| Module secrets | Database service and schema used for storage |
| Rationale | PUC Num 10-11; FR 16-18 |

| MediaContentData | Store and provide information for media content |
| --- | --- |
| Dependencies | None |
| Implementation | Database storage for MediaContentData with records containing MediaContent information. Functions for CRUD operations on MediaContent will be created |
| Module secrets | Database service and schema used for storage |
| Rationale | PUC NUM 16-18; FR 12-15, 23-27|

| FeedbackData | Store and provide information for user feedback |
| --- | --- |
| Dependencies | None |
| Implementation | Database storage for FeedbackData with records containing Feedback information. Functions for CRUD operations on Feedback will be created |
| Module secrets | Database service and schema used for storage |
| Rationale | PUC NUM 20; FR 28 |

### 4.2 Algorithm Module Secrets

| NewsAndEventsFunctions | Non-trivial server-side algorithms necessary for processing news and events |
| --- | --- |
| Dependencies | EventsData, NewsStoriesData |
| Implementation | Aggregate information queried from database for news and events, sort and filter by search criteria, get relevant record fields |
| Module secrets | Database query logic, data structures and algorithms used to aggregate data, interpretation of client requests and database record structure from query results |
| Rationale | Server-side processing for functionality with news and events display, event posting, and event notifications as outlined in PUC 1-8 and FR-{1-11} from SRS |

| EventNotificationFunctions | Non-trivial server-side algorithms necessary for processing event notifications |
| --- | --- |
| Dependencies | EventsData |
| Implementation | Call the Android or iOS API and schedule an event notification at a specific date |
| Module secrets | Database query logic, data structures and algorithms used to aggregate data, interpretation of client requests and database record structure from query results |
| Rationale | PUC Num 2-4; FR 2-6 |

| MessagesFunctions | Non-trivial server-side algorithms necessary for processing messages |
| --- | --- |
| Dependencies | MessagesData |
| Implementation | Sorting algorithm to sort the messages based off of timestamp.  |
| Module secrets | Sorting algorithm  |
| Rationale | PUC NUM 10-11; FR 16-17 |

| MediaContentFunctions | Non-trivial server-side algorithms necessary for processing media content |
| --- | --- |
| Dependencies | MediaContentData |
| Implementation | Filter functions to ensure location, date/time.  |
| Module secrets | Filter functions |
| Rationale | PUC NUM 16-18; FR 12-15, 23-27 |

| AuthenticationFunctions | Non-trivial server-side algorithms necessary for processing authentication |
| --- | --- |
| Dependencies | AccountsData |
| Implementation | Function that ensures top-notch security by adding salts and hashing passwords when creating accounts. Functions that ensure the authenticates/authorizes uses when correct usernames and passwords get added in |
| Module secrets | Salting and hashing functions. |
| Rationale | PUC Num 13-14; FR 18-19 |

### 4.3 Interface Module Secrets

| NewsAndEventsPage | Front-end rendering and server requests for news and events page |
| --- | --- |
| Dependencies | EventsData, NewsStoriesData, NewsAndEventsFunctions |
| Implementation | Rendering and layout of news and events page with information for news and events returned by the server |
| Module secrets | Requests made to server, element hierarchy within front-end components |
| Rationale | PUC 1 and FR 1 |

| EventNotificationFormat | Front-end rendering and server requests for event notifications |
| --- | --- |
| Dependencies | EventsData, EventNotificationFunctions |
| Implementation | Content and rendering of an event notification for display, given an event record to which the notification corresponds, and implemented specifically for iOS and Android depending on device |
| Module secrets | Requests made to server, element hierarchy within front-end components |
| Rationale | PUC 2-4 FR 2-6 |

| EventsCalendarPage | Front-end rendering and server requests for events calendar page |
| --- | --- |
| Dependencies | EventsData, EventNotificationFunctions |
| Implementation | Rendering and layout of events calendar page with information for events returned by the server |
| Module secrets | Requests made to server, element hierarchy within front-end components |
| Rationale | PUC 1-8 and FR 1-11 |

| EventForm | Front-end rendering and server requests for posting events |
| --- | --- |
| Dependencies | EventsData |
| Implementation | Takes form information and calls the EventsData CREATE operation |
| Module secrets | Requests made to server, front-end components indicate to user that data has been submitted |
| Rationale | PUC 1-8 and FR 1-11 |

| NewsStoryForm | Front-end rendering and server requests for posting news stories |
| --- | --- |
| Dependencies | NewsStoriesData |
| Implementation | Takes form information and calls the NewStoriesData CREATE operation |
| Module secrets | Requests made to server, front-end components indicate to user that data has been submitted |
| Rationale | PUC NUM-1; FR 1  |

| MessagesPage | Front-end rendering and server requests for messaging |
| --- | --- |
| Dependencies | MessagesData, MessagesFunctions |
| Implementation | Takes form information and calls the MessagesData CREATE operation |
| Module secrets | Requests made to server, front-end components indicate to user that data has been submitted |
| Rationale | PUC Num 10-11; FR 16-18 |

| MediaContentPage | Front-end rendering and server requests for viewing media content |
| --- | --- |
| Dependencies | MediaContentData, MediaContentFunctions |
| Implementation | Rendering and layout of media content page with information for media content items returned by the server |
| Module secrets | Requests made to server, element hierarchy within front-end components |
| Rationale | PUC NUM 16-18; FR 12-15, 23-27 |

| MediaContentForm | Front-end rendering and server requests for uploading media content |
| --- | --- |
| Dependencies | MediaContentData, MediaContentFunctions |
| Implementation | Takes form information and calls the MediaContentData CREATE operation |
| Module secrets |  Requests made to server, front-end components indicate to user that data has been submitted |
| Rationale | PUC NUM 16-18; FR 12-15, 23-27 |

| AuthenticationForm | Front-end rendering and server requests for authentication |
| --- | --- |
| Dependencies | AccountsData, AuthenticationFunctions |
| Implementation | Takes form information and calls the AuthenticationData CREATE operation |
| Module secrets |  Requests made to server, front-end components indicate to user that data has been submitted|
| Rationale | PUC Num 13-14; FR 18-19 |

| FeedbackForm | Front-end rendering and server requests for user feedback |
| --- | --- |
| Dependencies | FeedbackData |
| Implementation | Takes form information and calls the FeedbackData CREATE operation |
| Module secrets |  Requests made to server, front-end components indicate to user that data has been submitted|
| Rationale | PUC NUM 20; FR 28 |

## 5. Module Interface

<!--
For each module, you will also give the interface that it offers (i.e. what services it gives).
Be careful that your interface does not leak its secrets.

Marking: (15) description of the services (MIS)

Relevant textbook sections for reference: 4.2.2.1, 4.2.3.1, 4.2.4, ?

| (Name of module) | (Name and type signature of exported procedure) |
| --- | --- |
| Input parameters | (List and describe each input parameter) |
| Output value | (State and describe output/return value) |
| Side effects | (Outline any variable/external state changes) |
| Description | (English prose for what service is provided) |
 -->

### 5.1 Data Module Interface

| EventsData | createEvent(name: string, description: string, datetime: date, location: string): void |
| --- | --- |
| Input parameters | name - full name of event <br> description - description of event <br> datetime - date and time of event <br> location - location of event |
| Output value | None |
| Side effects | New event record (name, description, datetime, location) stored in database |
| Description | Add an event record to permanent storage for later access, given a name, description, date/time and location of the event |

| EventsData | updateEvent(name: string, description: string, datetime: date, location: string): void |
| --- | --- |
| Input parameters | name - full name of event <br> field - field of event that the admin user wishes to update  <br> value - the value of the field that the admin user wishes to update the field with |
| Output value | None |
| Side effects | Update the event record stored in database |
| Description | Update the event record in permanent storage for later access |

| EventsData | deleteEvent(name: string, datetime: date): void |
| --- | --- |
| Input parameters | name - full name of event <br> datetime - date and time of event |
| Output value | None |
| Side effects | Delete the event record stored in database |
| Description | Delete the event record from permanent storage |

| EventsData | getEvent(id: int): Event |
| --- | --- |
| Input parameters | id - id of event |
| Output value | Event |
| Side effects | None |
| Description | Fetches the event from permanent storage |

| EventsData | getAllEvents(): [Event] |
| --- | --- |
| Input parameters | None |
| Output value |  Array of Events |
| Side effects | None |
| Description | Fetch all the events from permanent storage |

| NewsStoriesData | createNewsStory(name: string, content: string, datetime: date): void |
| --- | --- |
| Input parameters | name - full name of NewsStories <br> content - content of NewsStories <br> datetime - date and time |
| Output value | None |
| Side effects | Creates a news story in the database |
| Description | Add a news story to permanent storage for later access |

| NewsStoriesData | updateNewsStory(name: string, content: string, datetime: date): void |
| --- | --- |
| Input parameters | name - full name of News Story <br> content - content of News Story <br> datetime - date and time of News Story |
| Output value | None |
| Side effects | Updates a news story in the database |
| Description | Updates the news story in permanent storage for later access  |

| NewsStoriesData | deleteNewsStory(id: int): void |
| --- | --- |
| Input parameters | id - of news story |
| Output value | None |
| Side effects | Deletes the news story from the database |
| Description | Deletes the news story from permanent storage |

| NewsStoriesData | getNewsStory(id: int): NewsStory |
| --- | --- |
| Input parameters | id - id of news story |
| Output value | NewsStory |
| Side effects | None |
| Description | Fetches a new story from permanent storage |

| NewsStoriesData | getAllNewsStories(): [NewsStory] |
| --- | --- |
| Input parameters | None |
| Output value | Array of NewsStories |
| Side effects | None |
| Description | Fetches all the news stories from permanent storage |

| AccountsData | createAccount(username: string, password: string, location: string): void |
| --- | --- |
| Input parameters | username - username of the user <br> password - password of the user <br> location - location of the user |
| Output value | None |
| Side effects | Saves account information in the database  |
| Description | Saves the account information in permanent storage for later access |

| AccountsData | updateAccount(id: String, location: String): void  |
| --- | --- |
| Input parameters | id - id of account, username, password, location - city|
| Output value | None |
| Side effects | Updates the account information in the database |
| Description | Updates the account information in permanent storage for later access |

| AccountsData | getAccount(id: int): Account |
| --- | --- |
| Input parameters | id - id of the account |
| Output value | Account |
| Side effects | None |
| Description | Retrieve the account information from database |

| MessagesData | saveMessage(id: String, from_user_id: String, content: String, sendAt: date, messageType: ENUM): void |
| --- | --- |
| Input parameters | id - a unique identifier of the message <br> from_user_id - the username of the sender of the message <br> content - the content of the message <br> sendAt -date and time of message was sent at <br> messageType - type of the message  |
| Output value | None |
| Side effects | Saves a new message in the database |
| Description | Saves a new message in the permanent storage for later access |

| MessagesData | getMessage(id: String): Message |
| --- | --- |
| Input parameters | id: a unique id of the Message |
| Output value | Message |
| Side effects | Fetches a message from the database |
| Description | Fetches a message from permanent storage |

| MessagesData | getAllMessages(): [Messages] |
| --- | --- |
| Input parameters | None |
| Output value | Collection of all messages |
| Side effects | Fetches all the messages from the database |
| Description | Fetches all the messages from permanent storage |

| MediaContentData | saveMediaContent(id : String, file : MediaContent, username : String, description : String): void |
| --- | --- |
| Input parameters | id - id of media content <br> file - media content <br> username - username of uploaded user <br> description - description of media content  |
| Output value | None |
| Side effects | Saves a media content in database |
| Description | Saves a media content in the permanent storage for later access |

| MediaContentData | updateMediaContent(id : String, file : MediaContent, username : String, description : String): void |
| --- | --- |
| Input parameters | id - id of media content <br> file - media content <br> username - username of uploaded user <br> description - description of media content |
| Output value | None |
| Side effects | Updates a media content in database |
| Description | Updates a media content in the permanent storage for later access |

| MediaContentData | deleteMediaContent(id : String): void |
| --- | --- |
| Input parameters | id - id of media content |
| Output value | None |
| Side effects | Deletes the MediaContent from the database |
| Description | Deletes the MediaContent from the database |

| MediaContentData | getMediaContent(id : String): MediaContent |
| --- | --- |
| Input parameters | id - id of media content |
| Output value | MediaContent |
| Side effects | Fetches a MediaContent from the database |
| Description | Fetches a MediaContent from permanent storage |

| MediaContentData | getAllMediaContent(): [MediaContent] |
| --- | --- |
| Input parameters | None|
| Output value | Array of MediaContent |
| Side effects | Fetches all MediaContent from the database |
| Description | Fetches all the MediaContent from permanent storage |

| FeedbackData | saveFeedback(id: String, feedback : String : username : String, date : Datetime): void |
| --- | --- |
| Input parameters | id - id of feedback <br> feedback - feedback content <br> username - user owner of feedback <br> date - date of feedback |
| Output value | None |
| Side effects | Saves a new feedback in the database |
| Description | Saves the feedback in permanent storage for later access |

| FeedbackData | getAllFeedback(): [Feedbacks] |
| --- | --- |
| Input parameters | None |
| Output value | Array of all Feedbacks |
| Side effects | Fetches all the feedbacks from the database |
| Description | Fetches all the feedbacks from permanent storage |

### 5.2 Algorithm Module Interface

| NewsAndEventsFunctions | fetchNewsEvents(count: number): [NewsStory\|Event] |
| --- | --- |
| Input parameters | count (optional) - number of records to retrieve |
| Output value | Collection of news and event records |
| Side effects | None |
| Description | Fetch list of news stories and events for display, either complete or limited by a maximum |

| NewsAndEventsFunctions | filterNewsEventsByLocation(region: String): [NewsStory\|Event] |
| --- | --- |
| Input parameters | region: Location to retrieve news from|
| Output value | Collection of news and event records |
| Side effects | None |
| Description | Filter list of news stories and events by region |

| NewsAndEventsFunctions | filterNewsEventsByDateTime(datetime: Datetime): [NewsStory\|Event] |
| --- | --- |
| Input parameters | datetime - date and time of event |
| Output value | Collection of news and event records |
| Side effects | None |
| Description | Filter list of news stories and events by date and time |

| NewsAndEventsFunctions | sortNewsEventsByTime(datetime : Datetime): [NewsStory\|Event] |
| --- | --- |
| Input parameters | datetime - date and time of event|
| Output value | Collection of news and event records sorted by chronological order |
| Side effects | None |
| Description | Sort list of news stories and events by date and time |

| NewsAndEventsFunctions | getEventLink(id: number): (Event.Link: string) |
| --- | --- |
| Input parameters | id - a unique id of Event |
| Output value | Link - a direct URL to the Event |
| Side effects | Fetches EventLink from the database |
| Description | Fetches EventLink from permanent storage |

| NewsAndEventsFunctions | getNewsStoryLink(id: number): (NewsStory.Link: string) |
| --- | --- |
| Input parameters |  id - a unique id of NewsStory |
| Output value | Link - a direct URL to the NewsStory |
| Side effects | Fetches NewsStoryLink from the database |
| Description | Fetches NewsStoryLink from permanent storage |

| EventNotificationFunctions | scheduleNotifications(name: string, users: [Users], content: string, link: string, datetime: Datetime): ? |
| --- | --- |
| Input parameters | name - full name of notification <br> users - Array of users who will receive the Notification <br> content - content of the notification <br> link - direct URL to event <br> datetime - date and time of the Notification   |
| Output value | None |
| Side effects | None |
| Description | Schedule a notification that will be shown to user in a future time |

| EventNotificationFunctions | deliverNotification(type: string, users : [Users], id : string, event : Event): ? |
| --- | --- |
| Input parameters | type - String <br> users - Array of users who will receive the Notification <br> id - a unique identifier of Notification <br> event - the content of the notification|
| Output value | User will receive a notification |
| Side effects | None |
| Description |  Deliver a Notification to users |

| EventNotificationFunctions | getEventFromNotification(id: String): Event |
| --- | --- |
| Input parameters | id - a unique identifier of the notification |
| Output value | Event |
| Side effects | None |
| Description | returns the event of the notification |

| EventNotificationFunctions | organizeEventsCalendar(datetime: DateTime, region: Region): None |
| --- | --- |
| Input parameters | datetime - the current date and time <br> region - region of the events |
| Output value | None |
| Side effects | Events are sorted and filtered by region and datetime |
| Description | Search, sort, and filter Events to determine the order of Events to display on Calendar page |

| MessagesFunctions | organizeMessages(datetime: date): [Message]|
| --- | --- |
| Input parameters | datetime - the current date and time |
| Output value | Array of messages |
| Side effects | Messages are sorted by datetime |
| Description | Search, sort, and filter Messages to determine the order of Messages to display on Chat page |

| MessagesFunctions | generateAutoMessageResponse(message: Message): Message |
| --- | --- |
| Input parameters | Message - message to reply to |
| Output value | Message response |
| Side effects | None |
| Description | Generates a response to Message automatically |

| MessagesFunctions | autoMessageResponseNeeded(): Boolean |
| --- | --- |
| Input parameters | None |
| Output value | Boolean |
| Side effects | None |
| Description | Returns a boolean if a an auto message response is needed. |

| MediaContentFunctions | fetchMediaContent(): MediaContent |
| --- | --- |
| Input parameters | None |
| Output value | MediaContent |
| Side effects | None |
| Description | fetch MediaContent from the database |

| MediaContentFunctions | filterMediaContentByLocation(region: string): [MediaContent] |
| --- | --- |
| Input parameters | region - the region of the location |
| Output value | Collection of MediaContent |
| Side effects | None |
| Description | Filter list of MediaContent by region |

| MediaContentFunctions | filterMediaContentByDateTime(datetime: Datetime): [MediaContent] |
| --- | --- |
| Input parameters | datetime - date and time |
| Output value | Collection of MediaContent |
| Side effects | None |
| Description | Filter MediaContent by its date/time |

| MediaContentFunctions | sortMediaContentByTime(datetime: date): None |
| --- | --- |
| Input parameters | datetime - time |
| Output value | Collection of MediaContent |
| Side effects | None |
| Description | Sort MediaContent by time |

| MediaContentFunctions | getMediaContentLink(id: String): MediaContent.Link |
| --- | --- |
| Input parameters | id - a unique identifier of MediaContent |
| Output value | Link - a direct URL to MediaContent |
| Side effects | None |
| Description | Retrieves the direct URL to the Media Content |

| AuthenticationFunctions | authenticateUser(username: String, password: String): Boolean |
| --- | --- |
| Input parameters | Username - Account Username <br>password - Account Password |
| Output value | True if valid username and password are provided <br> False if invalid username and password are provided|
| Side effects | (Outline any variable/external state changes) |
| Description | Authenticate a user with their username and password   |

### 5.3 Interface Module Interface

| NewsAndEventsPage | displayNewsAndEvents(): display |
| --- | --- |
| Input parameters | None |
| Output value | Display for news and events page |
| Side effects | None |
| Description | Scrolling feed displaying news and events |

| EventNotificationFormat | formatNotification(eventid: string): notification |
| --- | --- |
| Input parameters | eventid - identifier for event to display in notification |
| Output value | Formatted notification with event name as title, date/time and location as subtitle, and description as content when notification is expanded |
| Side effects | None |
| Description | Provides the layout of the notification to be displayed when a notification is schedule to be sent |

| EventsCalendarPage | displayEventsCalendar(): display |
| --- | --- |
| Input parameters | None |
| Output value | Display Calendar events page |
| Side effects | None |
| Description | Calendar UI displaying events |

| EventForm | displayEventForm(): display |
| --- | --- |
| Input parameters | None |
| Output value | An event form UI |
| Side effects | None |
| Description | Form for admin to input data to be displayed in an event posting or notification |

| EventForm | validateEventForm(): boolean |
| --- | --- |
| Input parameters | None |
| Output value | Boolean result for validity of form |
| Side effects | Display error strings for invalid fields or issues to be addressed |
| Description | A function to validate the events being posted |

| NewsStoryForm | displayNewsStoryForm(): display |
| --- | --- |
| Input parameters | None |
| Output value | Display News Story Form |
| Side effects | None |
| Description | A form for admin to put in updated news |

| NewsStoryForm | validateNewsStoryForm(): boolean |
| --- | --- |
| Input parameters |  None |
| Output value | Boolean result for validity of form |
| Side effects | Display error strings for invalid fields or issues to be addressed |
| Description | A function to validate the news story being posted |

| MessagesPage | displayMessages(): display |
| --- | --- |
| Input parameters | None |
| Output value | Display messages |
| Side effects | None |
| Description | Scrolling feed of messages |

| MediaContentPage | displayMediaContent(): display |
| --- | --- |
| Input parameters | None |
| Output value | Display Media content |
| Side effects | None |
| Description | Scrolling feed of Media content |

| MediaContentForm | displayMediaContentForm(): display |
| --- | --- |
| Input parameters | None |
| Output value | Display media content form |
| Side effects | None |
| Description | Display interface for admin (and possibly regular users) to upload media content such as photos, videos, etc. with appropriate title, captions, etc. |

| MediaContentForm | validateMediaContentForm(): boolean |
| --- | --- |
| Input parameters | None |
| Output value | Boolean result for validity of form |
| Side effects | Display error strings for invalid fields or issues to be addressed |
| Description | A function to validate the media content being posted |

| AuthenticationForm | displayAccountForm(): display |
| --- | --- |
| Input parameters | None |
| Output value | Display authentication form |
| Side effects | None |
| Description | Display form to authenticate user |

| AuthenticationForm | validateAccountForm(): boolean |
| --- | --- |
| Input parameters | None |
| Output value | Boolean result for validity of form |
| Side effects | Display error strings for invalid fields or issues to be addressed |
| Description | A function to validate authentication form |

| FeedbackForm | displayFeedbackForm(): display |
| --- | --- |
| Input parameters | None |
| Output value | Display feedback form |
| Side effects | None |
| Description | Display input form for user to submit feedback about the application |

| FeedbackForm | validateFeedbackForm(): boolean |
| --- | --- |
| Input parameters | None |
| Output value | Boolean result for validity of form |
| Side effects | Display error strings for invalid fields or issues to be addressed |
| Description | A function to validate feedback form |

## 6. SRS Changes

<!--
A list of changes that you made to your SRS, because you learned of mistakes, or simply needed improvements, because of doing the above.

Marking: (10) clear communication of the SRS changes

Relevant textbook sections for reference: ?

| (Type of change) | (Short descriptive name of change) |
| --- | --- |
| Description | (Provide more details on the change itself) |
| Rationale | (Explain why it is an appropriate change) |
| Link to SRS | (Direct hyperlink(s) to the SRS wiki) |
 -->

| Fixing mistakes | Update constraints on location accuracy |
| --- | --- |
| Description | "Further, the application must be able to track the location of the user with the phone's built-in GPS. This is important since the notifications users will receive will be based upon their geographic location. The accuracy of the location of the user may vary according to the phone model." &rarr; "Application functionality may additionally be restricted by the accuracy of location tracking on the user's device. An incorrect location calculation may result in the user receiving wrong results for localized events, news stories, etc." |
| Rationale | This change removes mentions of the design decision that location must be tracked using GPS specifically, and instead focuses the description on the constrained application functionality, per feedback received on the original SRS. |
| Link to SRS | 2.3 Product Constraints |

| Fixing mistakes | Remove FR: ID-28 and FR: ID-29 |
| --- | --- |
| Description | Remove ID-28 and FR: ID-29 pertaining to modern interface refresh for Eruku Mesi North America website while retaining existing functionality. |
| Rationale | These are not quite functional requirements and are simply expectations that are broad and subjective, and per feedback received on SRS. |
| Link to SRS | 3.2 Functional Requirements |

| Improvements | Include CRUD operations for news stories |
| --- | --- |
| Description | Include functional requirements detailing CRUD operations for news events, nearly identical to ID: FR-{8-11} for events. |
| Rationale | Initially did not envision that news story records would need manipulation as event notifications only pertain to events, but news story records additionally need to be manipulated for news and events page. |
| Link to SRS | 3.2 Functional Requirements |

| Improvements | Include additional references for quality of service and compliance |
| --- | --- |
| Description | Include the following additional references for quality of service and compliance with Google Play Store and Apple App Store guidelines: <br><br> <https://support.google.com/googleplay/android-developer/answer/9893335?hl=en&ref_topic=9877766> <br><br> <https://support.google.com/googleplay/android-developer/answer/9888076> <br><br> <https://support.google.com/googleplay/android-developer/answer/10144311> <br><br> <https://support.google.com/googleplay/android-developer/answer/9876714?hl=en&ref_topic=9877065> <br><br> <https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage> |
| Rationale | The level of detail in the original SRS was somewhat lacking and required specifics as to which guidelines had to be adhered to with the Google Play Store and Apple App Store. These additional references aim to elaborate on the descriptions already outlined for compliance, without losing information through paraphrasing, as full references are given. Each of these resources additionally provides useful information that is relevant to quality of service. |
| Link to SRS | 3.3 Quality of Service, 3.4 Compliance |

## 7. Dependency Diagram

<!--
A diagram of the "depends on" relation between your modules.
A module A usually depends on module B when A does an explicit call to a method of B.
Circular dependencies are usually a sign of a bad decomposition (but not always).

Marking: (5) it must be a 'depends on' diagram

Relevant textbook sections for reference: 4.2.3.2, 4.2.4, ?
-->

Shown below is the module dependency diagram where A &rarr; B means "A depends on B."

![Dependency Diagram](https://i.imgur.com/EduJx5R.jpg)

## 8. Significant Design

<!--
For the modules that contain significant algorithms, or maintain non-trivial invariants, these should be documented too.

Marking: (10)

Relevant textbook sections for reference: 4.2.4, ?

| (Name of module) | (Short descriptive name of algorithm/invariant) |
| --- | --- |
| Description | (Explain any significant algorithms or non-trivial invariants being maintained within this module) |
| Rationale | (Explain why everything outlined above is needed) |
 -->

| MessagesFunctions | Automated responses for common questions within messaging interface |
| --- | --- |
| Description | Automated responses within the messaging interface, when there are no other active users and a recent message may require a response, would require a non-trivial implementation. Unless there is only a naive or finite list of common questions that can be answered, there may need to be some dependency on external libraries and APIs that provide chatbot capabilities driven by machine learning, to the furthest degree possible. |
| Rationale | Automated message replies have been requested as a feature to be preferably included within the messaging interface. As the target audience for this application is relatively small, this feature may be frequently used with the smaller number of active users and increased need for direct replies to simulate two-way conversation. This aims to address the problem space where users of the application wish to stay connected and feel less lonely, by simulating conversation even without other humans available to give immediate replies. |

| MessagesFunctions | Search, sort, and filter Messages to determine the order of Messages to display on Chat page|
| --- | --- |
| Description | Searching sorting and filtering messages to determine the order of messages is used to display the messages to users in a correct chronological order.  |
| Rationale |  Organizing messages and displaying them properly is a critical component in ensuring the chat is correct and appropriate for a meaningful and accurate conversation. Since organizing data and displaying them is a very common feature for users to utilize, it is of significant design and this algorithm correctly and efficiently for users to have high user satisfaction. |

| EventNotificationFunctions | Scheduling of event notifications |
| --- | --- |
| Description | Scheduling algorithm to determine which events a user should be notified about, given their location and the date/time of the event. Event notifications are to be delivered to users at a time just enough in advance of the actual event date and time. Event notifications are also meant to be localized so users do not receive event notifications outside their geographic location. Users should only be notified once for any particular event, so there needs to be a record of which event notifications have been delivered to which users. |
| Rationale | This ensures that users only receive event notifications which are relevant and actionable on their part, being close enough with respect to time and location of the event for them to get prepared and travel to the event location. This is so event notification feature of the application can effectively address the problem of users expecting to stay connected with one another through social and cultural events which they are able to attend. |
