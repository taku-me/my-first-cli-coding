import React, { useState } from 'react';
import './AyurvedaQuiz.css';

const questions = [
  {
    id: 1,
    question: "あなたの体型は？",
    answers: [
      { text: "細身、軽い", dosha: "vata", score: 1 },
      { text: "中程度、引き締まっている", dosha: "pitta", score: 1 },
      { text: "ずっしり、がっしりしている", dosha: "kapha", score: 1 }
    ]
  },
  {
    id: 2,
    question: "あなたの肌質は？",
    answers: [
      { text: "乾燥しやすい", dosha: "vata", score: 1 },
      { text: "脂っぽく、敏感", dosha: "pitta", score: 1 },
      { text: "厚めで、潤いがある", dosha: "kapha", score: 1 }
    ]
  },
  {
    id: 3,
    question: "あなたの髪質は？",
    answers: [
      { text: "細く、乾燥気味", dosha: "vata", score: 1 },
      { text: "細く、油っぽい", dosha: "pitta", score: 1 },
      { text: "太く、濃い", dosha: "kapha", score: 1 }
    ]
  },
  {
    id: 4,
    question: "あなたの食欲は？",
    answers: [
      { text: "不規則で変わりやすい", dosha: "vata", score: 1 },
      { text: "強く安定している", dosha: "pitta", score: 1 },
      { text: "穏やかで安定している", dosha: "kapha", score: 1 }
    ]
  },
  {
    id: 5,
    question: "あなたの体温の傾向は？",
    answers: [
      { text: "冷え性気味", dosha: "vata", score: 1 },
      { text: "熱がりで暑がり", dosha: "pitta", score: 1 },
      { text: "普通、温かい", dosha: "kapha", score: 1 }
    ]
  },
  {
    id: 6,
    question: "あなたの性格は？",
    answers: [
      { text: "不安定で変わりやすい", dosha: "vata", score: 1 },
      { text: "情熱的で決断力がある", dosha: "pitta", score: 1 },
      { text: "穏やか、安定している", dosha: "kapha", score: 1 }
    ]
  },
  {
    id: 7,
    question: "あなたの話し方は？",
    answers: [
      { text: "速く、よく話す", dosha: "vata", score: 1 },
      { text: "はっきり、説得力がある", dosha: "pitta", score: 1 },
      { text: "ゆっくり、穏やか", dosha: "kapha", score: 1 }
    ]
  },
  {
    id: 8,
    question: "あなたの睡眠は？",
    answers: [
      { text: "浅く、短時間", dosha: "vata", score: 1 },
      { text: "中程度、規則的", dosha: "pitta", score: 1 },
      { text: "深く、長時間", dosha: "kapha", score: 1 }
    ]
  }
];

const doshaInfo = {
  vata: {
    name: "ヴァータ",
    color: "#8B7355",
    description: "空と風の要素。軽く、動的で、変化しやすい。創造性と活発性が特徴。",
    balance: "規則的な生活、温かい食事、ルーティンが大切です。"
  },
  pitta: {
    name: "ピッタ",
    color: "#FF6B6B",
    description: "火と水の要素。知性的で、決断力がある。情熱と志向性が特徴。",
    balance: "冷たい環境、リラックス、過度な努力を避けることが大切です。"
  },
  kapha: {
    name: "カファ",
    color: "#4ECDC4",
    description: "水と地の要素。安定していて、忍耐強い。愛情と落ち着きが特徴。",
    balance: "適度な運動、刺激的な活動、温かい食事が大切です。"
  }
};

export default function AyurvedaQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (dosha) => {
    setScores(prev => ({
      ...prev,
      [dosha]: prev[dosha] + 1
    }));

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getDominantDosha = () => {
    const max = Math.max(scores.vata, scores.pitta, scores.kapha);
    if (scores.vata === max) return 'vata';
    if (scores.pitta === max) return 'pitta';
    return 'kapha';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ vata: 0, pitta: 0, kapha: 0 });
    setShowResult(false);
  };

  return (
    <div className="ayurveda-quiz">
      <h1>アーユルベーダ体質診断</h1>

      {!showResult ? (
        <div className="quiz-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">質問 {currentQuestion + 1} / {questions.length}</p>

          <div className="question-box">
            <h2>{questions[currentQuestion].question}</h2>
            <div className="answers">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => handleAnswer(answer.dosha)}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="result-container">
          <h2>あなたの体質は...</h2>
          {Object.entries(scores).map(([dosha, score]) => {
            const info = doshaInfo[dosha];
            const percentage = (score / questions.length) * 100;
            return (
              <div key={dosha} className="score-display">
                <div className="score-header">
                  <h3 style={{ color: info.color }}>{info.name}</h3>
                  <span className="percentage">{percentage.toFixed(0)}%</span>
                </div>
                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: info.color
                    }}
                  ></div>
                </div>
              </div>
            );
          })}

          {(() => {
            const dominant = getDominantDosha();
            const info = doshaInfo[dominant];
            return (
              <div className="main-result" style={{ borderLeft: `5px solid ${info.color}` }}>
                <h2 style={{ color: info.color }}>主要体質: {info.name}</h2>
                <p className="description">{info.description}</p>
                <p className="balance-tip"><strong>バランスのコツ:</strong> {info.balance}</p>
              </div>
            );
          })()}

          <button className="reset-btn" onClick={resetQuiz}>
            もう一度診断する
          </button>
        </div>
      )}
    </div>
  );
}
