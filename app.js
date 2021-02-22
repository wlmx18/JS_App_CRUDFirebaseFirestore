const $taskform = document.getElementById('task-form')
const $tasksContainer = document.getElementById('tasks-container')

const db = firebase.firestore()

const saveTask = (title, description) => {
    db.collection('tasks').doc().set({
        title,
        description
    })
}

const getTask = () => db.collection('tasks').get()
// Cada vez que se agrege una tarea, ejecuta esta funcion onGetTasks()
// callback es un objeto
const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback)

const deleteTask = id => db.collection('tasks').doc(id).delete()

window.addEventListener('DOMContentLoaded', async e => {
    //const querySnapshot = await getTask()
    
    onGetTasks((querySnapshot) => {
        $tasksContainer.innerHTML = ""
        querySnapshot.forEach(doc => {
            console.log(doc.data())
            const task = doc.data()
            task.id = doc.id
            $tasksContainer.innerHTML += `
            <div class="card card-body mt-2 border-primary">
                <h5>${task.title}</h5>
                <div>
                    <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete</button>
                    <button class="btn btn-secondary">Edit</button>
                </div>
    
            </div>
            `
            const btnsDelete = document.querySelectorAll('.btn-delete')
            //console.log(btnsDelete)

            btnsDelete.forEach((btn) => {
                btn.addEventListener('click',async (e)=> {
                    //console.log('clicked ok')
                    //console.log(e.target.dataset.id)
                    await deleteTask(e.target.dataset.id)
                })
            })
        })
    })

    


    
})

$taskform.addEventListener('submit',async e => {

    e.preventDefault()

    //guarda solos el valor
    //const title = $taskform['task-title'].value

    //guarda el elemento
    const title = $taskform['task-title']
    const description = $taskform['task-description']
    //console.log(title, description)
    
    await saveTask(title.value, description.value)
    $taskform.reset()
    title.focus()
})


