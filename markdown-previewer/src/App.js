import React from "react";
import "./App.scss";
import marked from "marked";

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updatePreview = this.updatePreview.bind(this);
    this.state = {
      markdown: initText,
    };
  }

  updatePreview(event) {
    this.setState({
      markdown: event.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <label>Editor:</label>
        <textarea
          onChange={this.updatePreview}
          className="app-editor"
          id="editor"
          value={this.state.markdown}
          maxlength="3072"
        ></textarea>

        <label>Preview:</label>
        <div
          className="app-preview"
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked(this.state.markdown, { renderer: renderer }),
          }}
        ></div>
      </div>
    );
  }
}

const initText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://libormarko.github.io/), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg 'react logo')
`;
export default App;
