# Frontend Mentor - Mortgage repayment calculator solution

This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page


### Links

- Solution URL: [Github](https://github.com/Ghost-Writer-2/Mortgage-Repayment-Calculator)
- Live Site URL: [Live Preview](https://ghost-writer-2.github.io/Mortgage-Repayment-Calculator/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- SASS

### What I learned

I used to opportunity to practice using SASS and I learned how to create a mini CSS library. I learned how to style both the parent input element and it's sibling on focus.
Got to practice javascript more too. Also I think my responsive design skill is levelling up. 

```css
.input:focus {
  /* style goes here */
}

input:focus + <element> {
  /* style goes here */
}
```
```js
// removes default html error styles
document.addEventListener("invalid", (e) => {e.preventDefault()}, true)
```

### Continued development

I want to keep learning more advanced Javascript concepts and also keep getting better at css. 

## Author

- Frontend Mentor - [@Ghost-writer-2](https://www.frontendmentor.io/profile/ghost-writer-2)

## Acknowledgments

I'd like to thank Carlos. He helped me overcome a really big setback I encountered on this project. Thank you Carlos 💪

