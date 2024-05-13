import { useState } from 'react'

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const StatisticsLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const getAll = () => good + neutral + bad
  const getAverage = () => {
    const total = good - bad
    return total / getAll() || 0
  }
  const getPositive = () => {
    const result = good / getAll() * 100 || 0
    return `${result} %`
  } 

  if (good+neutral+bad != 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text='good' value={good}/>
            <StatisticsLine text='neutral' value={neutral}/>
            <StatisticsLine text='bad' value={bad}/>
            <StatisticsLine text='all' value={getAll()}/>
            <StatisticsLine text='average' value={getAverage()}/>
            <StatisticsLine text='positive' value={getPositive()}/>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>No feedback given</div>
  )
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' handleClick={() => setGood(good + 1)}/>
      <Button name='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button name='bad' handleClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App