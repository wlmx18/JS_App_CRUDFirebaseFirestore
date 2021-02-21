const $taskform = document.getElementById('task-form')

$taskform.addEventListener('submit', e => {
    //console.log('submit ok')
    const title = $taskform['task-title'].value
    const description = $taskform['task-description'].value
    console.log(title, description)
    e.preventDefault()
})