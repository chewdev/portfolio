import React from "react";
import Typist from "react-typist";

class QA extends React.Component {
  constructor(props) {
    super(props);
    // this.qA = [
    //   {
    //     question: "What do you do?",
    //     answer: "Full Stack Web Development."
    //   },
    //   {
    //     question: "What are your hobbies?",
    //     answer:
    //       "Coding is more than just a profession to me, it's also a hobby. I like tinkering with Arduino and want to get better working with IoT. I love traveling and baseball just as much and am currently working towards visiting all 30 MLB stadiums!"
    //   },
    //   {
    //     question: "What technologies do you have experience with?",
    //     answer:
    //       "JS, React, Node, Express, MongoDB, SQL, Sass, Bootstrap, Materialize, Redux, GraphQL, ..."
    //   },
    //   {
    //     question: "What is your favorite project so far?",
    //     answer:
    //       "This portfolio is my favorite web development project so far. I enjoy building in general, but this site has pushed me to really span the spectrum of web development to design, build and deploy it live."
    //   },
    //   {
    //     question: "Where do you see yourself in 5 years?",
    //     answer:
    //       "I love web development, but I have a wide range of interests in coding. Ideally I would be working with a company where it's possible to transfer to or work with other divisions of programming, such as IoT and robotics."
    //   },
    //   {
    //     question: "Dogs or cats?",
    //     answer: "Definitely dogs."
    //   }
    // ];
    this.qA = [];
    this.state = {
      items: [],
      currentText: "",
      textInput: "",
      questionArr: []
    };
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.howManyMatches = this.howManyMatches.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
  }

  componentWillMount() {
    if (this.qA.length < 1 && this.props.qA) {
      this.qA = this.props.qA;
    }
  }

  howManyMatches(questionArr, searchArr, textInput) {
    const wordArr = [];
    let count = 0;
    textInput.forEach(word => {
      if (!wordArr.includes(word)) {
        wordArr.push(word);
      }
    });
    wordArr.forEach(word => {
      if (questionArr.includes(word)) {
        count++;
      }
      if (searchArr.includes(word)) {
        count += 2;
      }
    });
    return count;
  }

  onTextInputChange(e) {
    if (e.target.value.match(/[\n]/g)) {
      this.getAnswer();
      return;
    }
    const textInput = e.target.value.toLowerCase();
    if (textInput.length === 0) {
      this.setState({ questionArr: [], textInput });
      return;
    }
    const textInputArr = textInput.split(" ").filter(word => word !== "");
    this.setState(prevState => {
      let items = this.qA.filter(obj =>
        textInputArr.some(
          inputWord =>
            obj.question
              .toLowerCase()
              .split(" ")
              .includes(inputWord) ||
            obj.search_terms
              .toLowerCase()
              .split(" ")
              .includes(inputWord)
        )
      );

      items = items.sort((objA, objB) => {
        const questionA = objA.question.toLowerCase().split(" ");
        const searchA = objA.search_terms.toLowerCase().split(" ");
        const questionB = objB.question.toLowerCase().split(" ");
        const searchB = objB.search_terms.toLowerCase().split(" ");
        let a = this.howManyMatches(questionA, searchA, textInputArr);
        let b = this.howManyMatches(questionB, searchB, textInputArr);

        return a > b ? -1 : 1;
      });
      const questionArr = items;
      return {
        currentText: "",
        questionArr,
        textInput,
        items
      };
    });
  }

  getAnswer(question) {
    const possibleAnsObj = this.qA.filter(
      val => val.question === question || val.question === this.state.textInput
    );
    const answerObj =
      possibleAnsObj.length === 1
        ? possibleAnsObj
        : this.state.questionArr.length > 0
          ? this.state.questionArr
          : [
              {
                answer:
                  "No matching questions, please rephrase or ask another question",
                question: this.state.textInput
              }
            ];
    const answer = answerObj[0].answer;
    this.setState({
      currentText: answer,
      questionArr: [],
      textInput: answerObj[0].question
    });
  }

  render() {
    return (
      <div style={{ height: "45.5rem" }}>
        <textarea
          className={`paper-text ${this.chromeClass}`}
          style={{
            background: "inherit",
            border: "none",
            fontFamily: "inherit",
            height: "11.5rem",
            width: "27rem",
            resize: "none",
            overflow: "hidden"
          }}
          placeholder="Get to know me: Click here and type your question. Click a suggestion to get the answer."
          onChange={this.onTextInputChange}
          value={this.state.textInput}
        />
        <button
          onClick={this.getAnswer}
          style={{
            marginLeft: "16rem",
            background: "inherit",
            border: "none",
            borderBottom: "1px solid black",
            fontFamily: "inherit",
            color: "inherit",
            fontSize: "2.2rem"
          }}
        >
          Ask
        </button>
        <div className={`paper-text ${this.chromeClass}`}>
          {this.state.currentText ? <p>{this.state.currentText}</p> : ""}
          {this.state.questionArr.length > 0 ? (
            <ul>
              {this.state.questionArr
                .filter((val, ind) => ind <= 4)
                .map(obj => (
                  <Typist
                    avgTypingDelay={10}
                    stdTypingDelay={10}
                    cursor={{ show: false }}
                    key={obj.question}
                  >
                    <li key={obj.question} className="question-option">
                      <a onClick={() => this.getAnswer(obj.question)}>
                        {obj.question}
                      </a>
                      <br />
                    </li>
                  </Typist>
                ))}
            </ul>
          ) : this.state.currentText !== "" ? null : this.state.textInput !==
          "" ? (
            <p>No matching questions</p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default QA;
