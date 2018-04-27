## Overview

The ePub Reader 0.3 (ER03) is a reading / study tool for students and a classroom management tool for teachers. ER03 caters to different learning types with a variety of ways to consume and study content. Critical thinking is facilitated through social annotations, allowing students to interact through highlights, text, emoji, audio, and video. Teachers have the ability to view class activity and set permissions to allow students to view and reply to classmates. 

## General User Stories
- Students can customize the book layout, read and highlight content, study and interact with other students throgh annotations, listen to the selection, or speed read selections.
- Teachers can give permissions to students, view highlights in student or classroom view, and interat with students through annotations.

### Settings
It's recommended to store `Settings` in a separate database table so that when a user signs into the reader, their previously used settings are imported. Teachers could then update permissions on the fly for classroom settings.

#### Demo Controls
Demo controls are only visable in the demo version of the reader.

##### User Stories (Demo Controls):
Demo users can `changeBooks` to view different content. 
- Choosing 'foghorn' will display **The Foghorn** (including `transcription` file)
- Choosing 'tym' will display **Thank You Ma'am** (no audio transcription)

Demo users can `changeUser` to experience the app as a teacher or student
- Select 'user1111' to experience the app as Tony Stark (student with three highlights) 
- Select 'user2222' to experience the app as Pepper Pots (student with zero highlights)
- Select 'user3333' to experience the app as Stan Lee (teacher with one highlight)

#### Teacher Settings 
Teacher settings are only visable if `user.role === "teacher"`. Teachers (users with `user.role === "teacher"`) can set permissions for the class at a book level in addition to being able to access the same settings as students.

##### User Stories (Teacher Settings)

Teachers can toggle `permissions.classView`.
- This allows students to toggle `settings.classView`, which displays, as a heatmap, highlights from all students. 
- If `permissions.classView` is not allowed, students will only be able to see highlights they own (created) as well as the teacher's highlights. (see Reading Settings below for info on `settings.classView`)

Teachers can toggle `permissions.socialAnnotations`.
- This allows students to add annotations to highlights they do not own. 
- If social annotations are not enabled, students may still be able to view other students' highlights, but they will only be able to add annotations to highlights they own.

#### Reading & Font Settings
Reading settings give the user customized control over the look and feel of the ER03. We recommend storing this data in a separate database, indexed by `userId` and `bookId` so the same settings will load, each time the user accesses the reader.

##### User Stories (Reading & Font Settings)
Users can toggle `settings.focusMode`.
- This hides highlights, aside interactions, and galleries from the content in order to focus on the text.

Users can toggle `settings.darkMode`.
- Changes the look of ER03 to have a dark background with light colored text to make it easier on the eyes.

Students can toggle `settings.classView`.
-  Shows classmates' highlights throughout the app -- only available if the teacher has enabled `permissions.classView` from teacher settings.

Students can select alternative `fontSize` or `fontFamily`.
- Changes the app fonts to add better accessibility and customization. 

### Book
The main content of the book is displayed here. It consists of: `OnlineUsers`, `BookDisplay`, `AudioContainer`, `HighlightTooltip`, and `Highlights`.

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

After the `bookString` is parsed into objects, highlight ids are then added to the highlights property by the `addHighlightsToBook` utility. 

Now that the book is formatted properly and the highlight ids have been added, it's time to display the highlights along with the book content.

#### User Story (BookDisplay) 
Users can read reflowable content.

#### Highlights (Displayed in Book)
The `highlights` object exist separate from the `bookDisplay`  and will be filtered by `user` and `settings` data, prior to being passed into `bookDisplay`. In other words, `bookDisplay` will handle all highlights that are passed into it. 

To determine the color of the highlight, 
- `BookDisplay` will first check if `settings.focusMode` is enabled. If it's enabled, no highlights will be displayed.
- Then check to see if there are any highlight ids included in the content object. 
  - Highlights are stored in a separate data object (`highlights`), which is then accessed to determine the color -- also stored in a separate data object (`colorLabels`) so that colors (and labels) can be updated at a classroom level.
  - If there are overlapping highlights on the same content, the highlight with the most recenty `highightId.updatedAt` will be used to determine the color of the highlight. 
- Then, if `audio.isPlaying` and `audio.showAudioHighlights` are both true, the audio highlight color temporarily overrides the user highlight color if the audio is being played. If the user pauses the audio, the audio highlight color remains on the screen. 

##### User Story (Highlights):
Users can select content to create a new highlight or click on an existing highlight to view the highlight contents. If more than one highlight exists on the element that was clicked, the user will then be given a list of highlights to choose from.

### Glossary
The original glossary consisted of multiple xhtml files and was combined into one object that could be referenced more easily. 

##### User Story (Glossary):
Users click on underlined words in the book, which will then display a definition in a clickaway 'snackbar' at the bottom of the page.

#### AudioContainer
The `AudioContainer` can be opened from the bottom navigation menu. If the user opens the audio drawer, but is not currently on the book slide (1), the slide is changed to the book slide and the audio drawer opens. 

- The current time is updated every 200 milliseconds, which also updated the current emc-*** ids to highlight, providing visual cues for the reader to follow along with the audio. 
- Along with the updated time, a separate function references a `transcription.json` file that was generated by a Node application, which leverages Google's Speech to Text API combine the transcription data with the actual text from the selection. (Currently only available for **The Foghorn**)

##### User Story (AudioContainer):
The user can open/hide audio drawer, pause/play audio, change the audio speed, skip forward or back one sentence at a time, scrub audio, and toggle the display of audio highlights. 

#### HighlightTooltip
The `HighlightTooltip` opens when the user makes a selection on the page. The user can then select a color to add a highlight. `HighlightTooltip` will move with the selection if the user scrolls (useful for mobile). There are five preselected colors with associated labels that can be altered by the teacher on a book level. The `colorLabels` data could be stored along with the settings.

##### User Story (HighlightToolTip):
The user can select a color to save the highlight, which then opens the modal to the newly created highlight.

#### HighlightModal
This is the center-peice for interaction on with the content. The modal/dialog displays the text of the highlight with a border matching the associated color. The modal holds a temporary version of the highlight content to make updates faster. The highlight stored in the database is only updated when the user clicks save on a single annotation, or when the blue checkbox is clicked to save all changes. 

*The current version saves annotations as part of the highlight object, but it's advised that annotations are saved in a separate database table. 

- If User A deletes a highlight that User B added an annotation to, the annotation would still be visable from User B's account. Soft deletes of the highlights/annotations are recommended so that the user/teacher can see archived content.

- This would enable us to potentially include annotations from other classrooms that are using the same book, similar to popular highlights feature on a Kindle. 

##### User Stories (Highlight Modal):

Users can delete annotations they own or delete an entire highlight, if they are the owner.

Users can add annotations to highlights.

- If the user has permission to add an annotation (as an owner, teacher, or if socialAnnotations are enabled on the highlight), they can add a note, audio, or video -- otherwise annotation buttons are disabled. 

- If users already have one unsaved annotation in the open model -- annotation buttons are disabled. Users can save a single annotation or save all changes. 

#### Galleries 
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

##### User Story (Gallery): 
Users can view and step through thumbnails of the gallery as it's positioned within the book text. Clicking on the thumbnail will then open a full-screen dialog to cycle through full-size images. 

### Highlights Tab
The `Highlights` tab displays all highlights for the current book. Highlights to display are filtered before reaching the `Highlights` component. 

#### Highlights List: 
Displays all highlights that are available to the user.

##### User Stories (Highlights List): 
Users can click on a highlight to see details and annotations of the highlight via the `HighlightModal`. 

Users can filter highlights based on highlight type. Further considerations may include allowing users to filter by user -- usefull only in `classView`.

#### Study Mode
Opens a full-screen dialog for flashcard studying, currently using the highlighted text as the front and the first annotation as the back. 

##### User Story: 
User can filter highlights before opening study mode / flashcards, where they can then flip and switch cards.  

#### Highlights Data
The `highlights` object is currently stored in a demo file, but would ultimately be stored in a separate database, indexed by a unique id. The API call would include `bookId` and `courseId` to GET the highlights for a particular book, filtered by class. Highlights is stucutured as an object that can be referenced by a unique id. 

*Consider storing the highlights as an array.

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

### Speed Reader
This displays one word at a time, helping users read faster than their normal reading speed. It's also useful on smaller devices.

##### User Story: 
User can select the speed at which they'd like words displayed, play/pause the content, and skip forward/backward one sentence at at time. 

## Bugs
- Adding multiple audio annotations causes re-recording of all audio annotations.

## Future Development Considerations
- Allow Students to set privacy controls and social controls on individual annotations.
- Create AI / machine learning tools for teachers to analyze opportunities for improvement. 
- Develop an interactions creator for teacher to insert custom interations into eBooks
- Store annotations with unique ids to update and save annotations on an individual basis. Store annotations in their own database table.
- Provide text-to-speech API services to generate audio files. 