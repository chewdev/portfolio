CREATE TABLE intro_questions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) UNIQUE,
    answer TEXT,
    search_terms VARCHAR(255)
);

INSERT INTO intro_questions (question, search_terms, answer)
    VALUES ("What do you do?", "career job do about work full stack developer frontend front end backend back", "I am a Full-Stack web developer with a focus on JavaScript. My current development stack is MySQL or MongoDB, Express, Node and React. Whether you need a frontend built with HTML, CSS and JavaScript or a RESTful API backend built with Node, Express and MySQL or MongoDB, I’m here to help."),

    ("How do you learn new technologies?", "learn study tech technology technologies development studying improve", "I study and learn in many different ways and it depends on what I am trying to learn. If it’s a new tool or framework, I find that the docs are typically the best way to learn. As technology ages, I find online tutorials on Youtube or courses on Udemy to better explain the concepts and usability and allow me to learn by example. Google and Stack Overflow are generally better for more advanced or specific use cases."),

    ("If you could be anywhere right now, where would you be?", "where travel location place now be", "I’m currently dedicated to improving my coding skills daily and I love where I live in California. However, I would love to be in Hawaii right now. Who would say no to those beautiful views while sitting near the beach and coding?"), 

    ("Do you prefer Front End or Back End development?", "frontend backend back front end development web prefer preference", "I truly enjoy both and prefer the variety in working on both ends of the stack. However, I currently feel more comfortable on the Front End with a strong foundation in React / JavaScript, HTML and CSS."),

    ("What skill are you hoping to master in the next year?", "technology skill design learn new soon next master proficient study improve year", "Working on the Full Stack, I often find holes in some part of the stack that I need to work on and I’m always working towards filling those gaps. There are also many tools I would like to become more proficient with, including TypeScript, GraphQL, Docker, Kubernetes, and AWS / Serverless. However, I feel the skill I need the most work on is design and I hope to vastly improve this over the next year."),

    ("Where do you see yourself in five years?", "future plan 5 10 five ten years where advancement goals", "My goal is to be leading a team on a project that truly makes a difference. As software developers, we have the opportunity to make a difference in countless lives. From enabling non-profits to receive the funding they need, to making education more accessible, or simply connecting people and making their lives easier, our opportunities to effect good change is endless and this is where I want to make my mark on society."),

    ("What is the most important aspect of your life?", "most important aspect part life", "Nothing comes before my family and my fiancée. For always being there for me and all the support they have given, I am eternally grateful."),

    ("What are your hobbies?", "hobbies do for fun hobby game free time", "Coding is more than just a career to me, it is my biggest hobby. I’m currently focused on improving my web development skills, however I am extremely interested in robotics, embedded systems, Arduino and IoT. Outside of tech, I love baseball, the beach and traveling. My fiancée and I are currently working towards visiting every MLB stadium at least once."),

    ("What is your favorite food?", "food favorite eat snack meal", "If I had to pick just one, I would have to choose a meal of enchiladas, tacos, rice and beans"),

    ("How long have you been coding?", "how long been coding experience time length", "I first started coding in college, learning some Matlab and Labview before moving onto C++ for embedded systems. However, I haven’t touched any of those in a while and have been completely focused on JavaScript development for the past year."),

    ("What are your biggest strengths?", "biggest strengths skills abilities ability skill strength best", "I am confident in my abilities to solve problems and learn quickly. I have always had a knack for connecting things logically and being able to quickly deduce how and why things work the way they do. However, interpersonal communication, self-reflection and self-improvement are all very important to me as well."),

    ("What are your biggest weaknesses?", "biggest weaknesses weakness worst bad", "I believe one of my weaknesses is that I care too much at times. Being a perfectionist about my work is part of what got me into engineering in the first place. However, I have realized this can really affect my productivity. I’m working to get better about accepting that sometimes it’s better to put out code with issues and iterate, rather than spending too much time worrying about being perfect."),

    ("What is your ideal work environment?", "ideal work environment job location remote job place", "I currently prefer to be surrounded by other amazing developers in a space where we advocate for each other, push each other to improve and teach and collaborate as necessary to work towards a common goal."),

    ("Do you have any tech interests besides web development?", "tech development interests interested technology engineering", "I’m not currently putting my time towards other tech, but I eventually want to get back into embedded systems and build some side projects for things like IoT and home automation."),

    ("What do you enjoy about web development?", "enjoy like web development job career", "My favorite part is the challenge to come up with elegant solutions to difficult problems, seeing the solution in effect and iterating to improve. The biggest bonus is the community of people excited to help each other and collaborate to work toward the common goal of becoming better developers."),

    ("How do you feel about working with tech or languages you haven’t used before?", "new tech languages programming java python c# c++ go golang learn work with haven’t have not used before working learning", "I am constantly working to learn new frameworks and tools to improve my toolset. Some tech is easier to pick up than others, but I always go in knowing that I can learn it. The only question is how long it will take."),

    ("What makes you a good developer?", "", "There are many facets that make a good developer, but some of my strong points include: A persistence	to solve difficult problems, knowing when to ask for help and when to lead, a strive to get things done and complete projects, a knowledge of the full stack from initial commit through deployment, and most importantly, being easy to work with and having a focus on improving along with others."),

    ("What education did you complete?", "education school learn study complete degree scholar university college", "I graduated from California Polytechnic State University San Luis Obispo with a Bachelors in Mechanical Engineering and a focus in Mechatronics where I received my first introduction to code. However, Mechanical Engineering was not for me and I decided to become a self-taught developer utilizing the vast array of resources that are readily available. I have used all types of resources, including FreeCodeCamp, Codecademy, SoloLearn, Udemy, Udacity, Youtube, StackOverflow and more."),

    ("Why did you decide to be self-taught?", "self taught self-taught developer learn own decide decision", "Having graduated with a degree in engineering, I already felt comfortable using, studying and learning from sources other than what is provided by an instructor. Being comfortable learning difficult engineering principles gave me confidence in learning web development. Also, having had a prior introduction to code, I didn’t run into as many of the usual struggles of being self-taught.")