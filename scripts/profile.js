document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#hamburger-menu');
const navLinks = document.querySelectorAll('nav a');
const programDiv = document.getElementById('program-classes');
const buttons = document.querySelectorAll('#button-container button');
const currentLink = window.location.pathname;

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

navLinks.forEach(link => {
    if (link.href.includes(currentLink)) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

function createCourseCard(course) {
    const courseCard = document.createElement('div');
    const subject = document.createElement('h3');

    if (course.completed) {
        courseCard.classList.add('completed');
    } else {
        courseCard.classList.add('incomplete');
    }

    subject.textContent = course.subject + " " + course.number;

    courseCard.appendChild(subject);

    programDiv.appendChild(courseCard);
}

function calculateCredits(coursesArray) {
    return coursesArray.reduce((total, course) => total + course.credits, 0);
}

function displayCourses(coursesArray) {
    programDiv.innerHTML = '';
    coursesArray.forEach(course => createCourseCard(course));
}

function filteredCourses(filter) {
    let filtered;
    if (filter === 'CSE') {
        filtered = courses.filter(course => course.subject === 'CSE');
    } else if (filter === 'WDD') {
        filtered = courses.filter(course => course.subject === 'WDD');
    } else {
        filtered = courses;
    }
    displayCourses(filtered);

    const credits = calculateCredits(filtered);
    document.getElementById('credit-counter').textContent = credits;
}

filteredCourses('All');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('open');
    hambutton.classList.toggle('open');
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 700) {
        mainnav.style.display = '';
        hambutton.classList.remove('open');
        hambutton.classList.remove('open');
    }
});