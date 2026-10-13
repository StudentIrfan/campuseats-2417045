# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Building a UI imperatively means you are writing step-by-step on how to build the UI and it focuses on the process. Meanwhile, building UI declaratively means you are only describing what the UI should look like based on the current data state, which React will automatically find the most efficient way to update the actual DOM to match what you have described.

2. Why must a component name start with a capital letter?
Inside a tag (<></>), React's JSX syntax determine what is inside it based on the first letter of the tag. For example, lowercase tags like <div></div> means it's a HTML element while an uppercase like <Button></Button> means it's a custom component that a developer has created.

3. What does a fragment <>...</> do, and why not just use a <div>?
In React, all components and contents must be returned in a single parent element, and fragment does exactly that. It encapsulates all its content and send it as one, thus also making sure it does not send an extra unnecessary wrapper node to the actual DOM. Relying solely on <div> tags would eventually clutter the DOM tree, which actually breaks the CSS layout and possibly ruining the HTML resulting in an invalid state.

4. Name one benefit of splitting the UI into small components.
One of the benefit would be the reusability of the components. This is especially crucial for components that usually repeats the same structure over and over again, like clickable buttons or brand/institutional logos.
