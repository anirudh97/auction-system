const Question = require('../models/questions.model.js');


exports.createQuestion = (req, res) => {
    console.log("Controller: Question: createQuestion: Invoked!");
    const question = new Question({
        email: req.session.user,
        questionText: req.body.question
    })
    Question.createQuestion(question, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Question: createQuestion: Error occured in creating question."
            });
        }

        else {
            console.log("Controller: Question: createQuestion: Question posted Successfully!");
            req.session.alertData = {"message": "Question posted successfully", "alertType": "success"};
            res.redirect('/home');
        }
    });
}

exports.postAnswer = (req, res) => {
    console.log("Controller: Question: postAnswer: Invoked!");
    const answer = {
        email: "custRep1@buyme.com",
        answerText: req.body.answer,
        questionId: req.params.questionId
    }
    Question.postAnswer(answer, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Question: postAnswer: Error occured in posting answer."
            });
        }

        else {
            console.log("Controller: Question:  postAnswer: Answer posted Successfully!");
            res.send({"status": 200, "data": "posted answer"});
        }
    });
}

exports.myQuestions = (req, res) => {
    if (req.session.loggedIn != true){
        res.redirect("/");
    }
    else{
        Question.myQuestions(req.session.user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Controller: Questions: myQuestions: Some error occured"
                });
            else
                console.log("Controller: Questions: myQuestions: Fetched My Questions");
                questionIds = new Set();
                answers = {}
                for (let i = 0; i < data.length; i++) {
                    if (data[i].question_id in answers) {
                        answers[data[i].question_id].push(data[i].answer_text)
                    } else {
                        item_images[data[i].itemId] = [data[i].imagePath]
                    };
                };
                res.render('pages/helpRequest', { "status": 200, "data": data});
        });

        res.render('pages/helpRequest'); 
    };
};

exports.allQuestions = (req, res) => {
    if (req.session.loggedIn != true){
        res.redirect("/");
    }
    else{
        Question.allQuestions((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Controller: Questions: allQuestions: Some error occured"
                });
            else
                console.log("Controller: Questions: allQuestions: Fetched All Questions");
                console.log(data);
                res.render('pages/customerRepInbox', { "status": 200, "data": data});
        });
    };
};
