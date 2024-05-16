const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ total }) => <p><b>total of {total} exercises</b></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <>
            {parts.map(part => <Part part={part} />)}
            <Total total={total} />
        </>
    )
}

const Course = ({course}) => {
    console.log(course)
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course