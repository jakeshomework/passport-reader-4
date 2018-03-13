import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { buildDisplayContent } from "./utils/buildDisplayContent";

/* ----- FOGHORN IMPORT ----- */
// import { BookOriginal } from "./data/foghorn/content1.js";
// import { BookOriginal } from "./data/foghorn/content1Unformatted.js";

/* ----- THANK YOU MA'AM IMPORT ----- */
// import { BookOriginal } from "./data/tym/content1.js";
import { BookOriginal } from "./data/tym/content1Unformatted.js";

import BookXHTML from "./data/foghorn/content1.xhtml";

console.log(">>>>", BookXHTML);

console.log(buildDisplayContent(BookOriginal));

const client = new ApolloClient({
  uri: "",
  clientState: {
    defaults: {
      currentSearch: {
        __typename: "myCurrentSearch",
        bookId: "none",
        page: "none"
      },
      modalContent: {
        __typename: "modalContent",
        interactionId: "yolo",
        open: false
      }
    },
    resolvers: {
      Mutation: {
        updateCurrentSearch: (_, { currentSearch }, { cache }) => {
          // set bookId and page of current search -- updates results
          cache.writeData({
            data: { currentSearch: currentSearch }
          });
          return null;
        },

        updateAndOpenModal: (_, { incoming }, { cache }) => {
          // open modal and set interaction to incoming interactionId
          cache.writeData({
            data: {
              modalContent: {
                __typename: "modalContent",
                interactionId: incoming.interactionId,
                open: true
              }
            }
          });
          return null;
        },

        clearAndCloseModal: (_, { incoming }, { cache }) => {
          // close modal -- do not clear interaction for smoother close
          cache.writeData({
            data: {
              modalContent: {
                __typename: "modalContent",
                open: false
              }
            }
          });
          return null;
        }
      }
    }
  }
});

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
