const $taskform = document.getElementById('task-form')

const db = firebase.firestore()

const saveTask = (title, description) => {
    db.collection('tasks').doc().set({
        title,
        description
    })
}

$taskform.addEventListener('submit',async e => {
    //console.log('submit ok')
    e.preventDefault()
    const title = $taskform['task-title'].value
    const description = $taskform['task-description'].value
    //console.log(title, description)

    //title:title javascriptModerno solo title
    await saveTask(title, description)
})