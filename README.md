## Overview

The ePub Reader 0.3 (ER03) is a reading / study tool for students and a classroom management tool for teachers. ER03 caters to different learning types with a variety of ways to consume and study content. Critical thinking is facilitated through social annotations, allowing students to interact through highlights, text, emoji, audio, and video. Teachers have the ability to view class activity and set permissions to allow students to view and reply to classmates. 

## General User Stories
- Students can customize the book layout, read and highlight content, study and interact with other students throgh annotations, listen to the selection, or speed read selections.
- Teachers can give permissions to students, view highlights in student or classroom view, and interat with students through annotations.

### Settings
It's recommended to store `Settings` in a separate database table so that when a user signs into the reader, their previously used settings are imported. Teachers could then update permissions on the fly for classroom settings.

#### Demo Controls
Demo controls are only visable in the demo version of the reader.
- Demo users can `changeBooks` to view different content. 
  - Choosing 'foghorn' will display **The Foghorn** (including `transcription` file)
  - Choosing 'tym' will display **Thank You Ma'am** (no audio transcription)
- Demo users can `changeUser` to experience the app as a teacher or student
  - Select 'user1111' to experience the app as Tony Stark (student with three highlights) 
  - Select 'user2222' to experience the app as Pepper Pots (student with zero highlights)
  - Select 'user3333' to experience the app as Stan Lee (teacher with one highlight)

#### Teacher Settings 
Teacher settings are only visable if `user.role === "teacher"`.
- Teachers can perform all settings interactions as students.
- Teachers can toggle `permissions.classView`.
  - This allows students to toggle `settings.classView`, which displays, as a heatmap, highlights from all students. 
  - If `permissions.classView` is not allowed, students will only be able to see highlights they own (created) as well as the teacher's highlights. (see Reading Settings below for info on `settings.classView`)
- Teachers can toggle `permissions.socialAnnotations`.
  - This allows students to add annotations to highlights they do not own. 
  - If social annotations are not enabled, students may still be able to view other students' highlights, but they will only be able to add annotations to highlights they own.

#### Reading & Font Settings
Reading settings give the user customized control over the look and feel of the ER03. 
- Students can toggle `settings.focusMode` to hide highlights, aside interactions, and galleries from the content in order to focus on the text.
- Students can toggle `settings.darkMode` to change the look of ER03 to have a dark background with light colored text to make it easier on the users eyes.
- Students can toggle `settings.classView` to show classmates highlights throughout the app -- only available if the teacher has enabled `permissions.classView` from teacher settings.
- Students can select alternative `fontSize` to change the font size. 
- Students can select alternative `fontFamily` to change the font family.

### Book
The main content of hte book is displayed here. It consists of: `OnlineUsers`, `BookDisplay`, `AudioContainer`, `HighlightTooltip`, and `Highlights`.

#### OnlineUsers
Placeholder avatars are show at the top of the book to see all users that are online, giving the teacher ability to monitor current users. Avatars would be hidden if `permissions.classView` is disabled by the teacher. 

#### BookDisplay
`BookDisplay` displays the main book content, and factors in the `settings`, `highlights` and `transcription` data to determine how to render the content. In order for `BookDisplay` to do it's job corrently, the `bookString` must first be processed by the utility, `formatBookString`, which assigns types and ids assigned to each word, space, and html tag. 

Here's an example from **The Foghorn** of a text object with zero highlights: 
~~~~
{
  id: "emc-39",
  type: "text",
  content: "water",
  display: "<span id="emc-39">water</span>",
  highlights: []
}
~~~~

#### Displaying Highlights
The `highlights` object exist separate from the `bookDisplay` content and will be filtered by `user` and `settings` data, prior to being passed into `bookDisplay`. In other words, `bookDisplay` will handle all highlights that are passed into it. 

To determine the color of the highlight, 
- `BookDisplay` will first check if `settings.focusMode` is enabled. If it's enabled, no highlights will be displayed.
- Then check to see if there are any highlight ids included in the content object. Highlights are stored in a separate data object (`highlights`), which is then accessed to determine the color -- also stored in a separate data object (`colorLabels`) so that colors (and labels) can be updated at a classroom level. 
- Then, if `audio.isPlaying` and `audio.showAudioHighlights` are both true, the audio highlight color temporarily overrides the user highlight color if the audio is being played. If the user pauses the audio, the audio highlight color remains on the screen. 

#### AudioContainer
The `AudioContainer` can be opened from the bottom navigation menu. If the user opens the audio drawer, but is not currently on the book slide (1), the slide is changed to the book slide and the audio drawer opens. 
- The user can pause/play audio, change the audio speed, skip forward or back one sentence at a time, scrub audio, and toggle `showAudioHighlights`.
- The current time is updated every 200 milliseconds, which also updated the current emc-*** ids to highlight, providing visual cues for the reader to follow along with the audio. 
- Along with the updated time, a separate function references a `transcription.json` file that was generated by a Node application, which leverages Google's Speech to Text API combine the transcription data with the actual text from the selection. (Currently only available for **The Foghorn**)

#### HighlightTooltip
The `HighlightTooltip` opens when the user makes a selection on the page. The user can then select a color to add a highlight. `HighlightTooltip` will move with the selection if the user scrolls (useful for mobile). Selecting a color will open the modal (see HighlightModal) where users can add annotations.

### HighlightModal
*TODO*

### Highlights Tab
The `Highlights` tab displays all highlights for the current book. Highlights to display are filtered before reaching the `Highlights` component. 
- Users can click on a highlight to see details and annotations of the highlight. 


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


## Future Development Considerations
- Allow Students to set privacy controls and social controls on individual annotations.
- Create AI / machine learning tools for teachers to analyze opportunities for improvement. 
- Develop an interactions creator for teacher to insert custom interations into eBooks
- Store annotations with unique ids to update and save annotations on an individual basis. Store annotations in their own database table.