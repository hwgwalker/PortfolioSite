let scrollItems = [...document.querySelectorAll('.js-scroll')]
let headers = [...document.querySelectorAll('h1')];
let titles = [...document.querySelectorAll('h2')];
let text = [...document.querySelectorAll('p')];
let picture = [...document.querySelectorAll('img')];
let link = [...document.querySelectorAll('a')];
const checkbox = document.getElementById('checkbox');

// DARK MODE TOGGLER

checkbox.addEventListener('change', () => {
    // Change theme of site
    document.body.classList.toggle('dark');
})




// SCROLL ANIMATIONS

let options = {
    rootMargin: '0px',
    threshold: .2,
}

let setItemActive = (entries => {
    console.log(entries)
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active')
        }
    })
});

let observer = new IntersectionObserver(setItemActive, options);

scrollItems.forEach((item) => {
    observer.observe(item)
})

headers.forEach((header) => {
    observer.observe(header)
})
titles.forEach((title) => {
    observer.observe(title)
})

text.forEach((text) => {
    observer.observe(text)
})

picture.forEach((picture) => {
    observer.observe(picture)
})

link.forEach((link) => {
    observer.observe(link)
})

// FORM SUBMISSION CLIENT-SIDE CODE

const form = document.getElementById("contactForm");

const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();
    let mail = new FormData(form);
    sendMail(mail);
});

const sendMail = (mail) => {
    fetch("/send", {
        method: "post",
        body: mail,
    }).then((response) => {
        return response.json();
    });
    location.reload();
    alert('Thanks for your email! I will read your message and respond shortly.')
};