## Overview

The ePub Reader 0.3 (ER03) is a reading / study tool for students and a classroom management tool for teachers. ER03 caters to different learning types with a variety of ways to consume and study content. Critical thinking is facilitated through social annotations, allowing students to interact through highlights, text, emoji, audio, and video. Teachers have the ability to view class activity and set permissions to allow students to view and reply to classmates. 

## User Stories
- Students can customize the book layout, read and highlight content, study and interact with other students throgh annotations, listen to the selection, or speed read selections.
- Teachers can give permissions to students, view highlights in student or classroom view, and interat with students through annotations.

### Settings

#### Demo Controls
- Demo users can `changeBooks` to view different content
- Demo users can `changeUser` to experience the app as a teacher or student

#### Teacher Settings 
- Teachers can perform all settings interactions as students
- Teachers can toggle student permissions to use `classView`
- Teachers can toggle student permissions to use `socialInterations`

#### Reading Settings
- Students can toggle `focusMode` to remove highlights, aside interactions, and galleries.
- Students can toggle `darkMode` to change the look of ER03.
- Students can toggle `classView` to show classmates highlights throughout the app -- this is only available if the teacher has allowed class view from teacher settings.

#### Font Settings
- Students can select alternative `fontSize`
- Students can select alternative `fontFamily`

### Book
*TODO*

### Highlights
*TODO*

### Annotations
*TODO*

### Study Mode
*TODO*

### Audio
*TODO*

### Speed Reader
*TODO*

## Data Structure and Handling
Data structure has been modified to work with the demo app. 

### Settings
Users' default settings are stored in a database and delivered via API with a `userId`

### Book
Book is currently stored as the original string from the xhtml file. Ideally, the book would be returned from an API in a format that could be processed by the `utils/formatBookString`.

In order to swap books in the demo, the cover image src was modified to represent the book directory within the public folder.

### Galleries 
Galleries are currently extracted from the original book string with `utils/formatBookString`, which modifies and stores array in ER03 local database. Galleries are replaced in the `bookDisplay` by divs with unique ids that reference the stored gallery data.

**Example galleries:**
```
galleries: [
  [
    {
      caption:"<p id=\"textShape-20-p0\" class=\"s16\">Jim, 1930.  William H. Johnson. ​<br/>Smithsonian American Art Museum, Washington, DC.</p>"
      src:"assets/images/09_01_01_01b.jpg"
      thumbnail:"assets/images/09_01_01_01b-thumb.png"
    },
    {},
    {},
  ],
]
```

### Highlights 
Highlights are currently stored in a demo file, but would ultimately be stored in a separate database, indexed by a unique id. The API call would include bookId and courseId to GET the highlights for a particular book, filtered by class. They are stucutured as an object that can be referenced by a unique id. BEI may want to consider storing the highlights as an array.

EMC could consider not filtering by class in order to get more highlights and annotations across other schools and classrooms -- user privacy would need to be heavily considered here but there may be value in displaying highlights anonymously. 

**Example highlight:**
```
a612967a-f4e2-4d50-ad9e-c4d9c05ee17f: {
  annotations:[{
    content:"demo-annotation-media/thumbs-up.webm",
    createdAt:"2018-04-10T18:59:37.579Z",
    type:"video",
    updatedAt:"2018-04-10T18:59:37.579Z",
    userId:"user333"  
  }],
  bookId:"555",
  color:"hlc3",
  courseId:"187",
  createdAt:"2018-04-10T18:59:36.088Z",
  endId:"emc-254",
  highlightedText:"he had hoped,",
  id:"a612967a-f4e2-4d50-ad9e-c4d9c05ee17f",
  startId:"emc-250",
  updated:"2018-04-10T18:59:36.088Z",
  userId:"user333"
}
```

### Glossary
*TODO*

### Interactions
*TODO*

## Bugs
- Adding multiple audio annotations causes re-recording of all audio annotations.
- Storing annotations without unique ids makes it difficult to update and save annotations on an individual basis. It's recommended to store annotations in their own database table.

## Future Development Considerations
- Allow Students to set privacy controls and social controls on individual annotations.
- Create AI / machine learning tools for teachers to analyze opportunities for improvement. 
- Develop an interactions creator for teacher to insert custom interations into eBooks