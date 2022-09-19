'use strict';

let todo_note_missions = []

const textarea = document.getElementById('textarea_input')
const date_input = document.getElementById('date_input')
const time_input = document.getElementById('time_input')

function save_form_inputs_value(form_inputs) {
  event.preventDefault()

  const textarea_value = textarea.value
  const date_input_value = date_input.value
  const time_input_value = time_input.value

  if (textarea_value.length <= 2) {
    alert(
      'please make sure to write your todo task in the notepad lines, input must not be empty and it must contain more than 2 characters !!'
    )
    event.preventDefault()
    return
  } else if (date_input_value == '') {
    alert(
      'please make sure to provid the due date of this task note, input must not be empty !! '
    )
    date_input.classList.add('class_for_error_validation')
    event.preventDefault()
    return
  } else if (time_input_value == '') {
    alert(
      'please make sure to provid the due time of this task note, input must not be empty !! '
    )
    time_input.classList.add('class_for_error_validation')
    event.preventDefault()
    return
  }

  push_new_mission_to_todo_note_missions(
    textarea_value,
    date_input_value,
    time_input_value
  )

  form_inputs.reset()
  print_note_missions_to_document_spacial_effect_on_last_index()
}

function remove_error_class_list_when_fixing(input_fixing) {
  input_fixing.classList.remove('class_for_error_validation')
}

function push_new_mission_to_todo_note_missions(
  textarea_value,
  date_input_value,
  time_input_value
) {
  const current_date = new Date()
  const id = '' + current_date.getTime()

  todo_note_missions.push({
    content: textarea_value,
    DueDate: date_input_value,
    DueTime: time_input_value,
    id: id,
  })

  save_mission_note_content_to_localstorage()
}

function save_mission_note_content_to_localstorage() {
  localStorage.setItem('missions', JSON.stringify(todo_note_missions))
}

function print_note_missions_to_document_spacial_effect_on_last_index() {
  document.getElementById('mission_note_creation_container').innerHTML = ''

  todo_note_missions.forEach((todo_note, index) => {
    if (todo_note_missions.length - 1 === index) {
      const div_with_fade_in_animation = document.createElement('div')

      div_with_fade_in_animation.setAttribute('the_index_of_note', index)

      div_with_fade_in_animation.classList.add(
        'image_background_container_with_animation',
        'box'
      )

      div_with_fade_in_animation.innerHTML += `
        <div class="note_content_container draggable" draggable="true">
      
          <input type="image" src="https://img.icons8.com/color/48/000000/close-window.png" class="input_type_image_button" onclick ="capture_click_on_the_remove_button(event)" id="${todo_note.id}"/></input>

          <div class="container_of_countdown">
            <div class="countdown_header_container">
              <h2 class="countdown_header"> <u>Ends in...</u> </h2>
            </div>
            <div class="countdown">
            </div>
          </div>
        
          <div class="div_for_text_in_note">
          ${todo_note.content}
          </div>
          <div class="div_for_time_and_date_in_note">
          <div>
          Due Date : ${todo_note.DueDate}
          </div>
          <div>
          Due Time : ${todo_note.DueTime}
          </div>
          </div>
        </div>`

      document
        .getElementById('mission_note_creation_container')
        .appendChild(div_with_fade_in_animation)

      display_countdown(todo_note.DueDate, todo_note.DueTime)
    } else {
      const div_without_fade_in_animation = document.createElement('div')

      div_without_fade_in_animation.classList.add(
        'image_background_container_without_animation',
        'box'
      )

      div_without_fade_in_animation.setAttribute('the_index_of_note', index)

      div_without_fade_in_animation.innerHTML += `
        <div class="note_content_container draggable" draggable="true">
      
          <input type="image" src="https://img.icons8.com/color/48/000000/close-window.png" class="input_type_image_button" onclick ="capture_click_on_the_remove_button(event)" id="${todo_note.id}"/></input>

          <div class="container_of_countdown">
            <div class="countdown_header_container">
              <h2 class="countdown_header"> <u>Ends in...</u> </h2>
            </div>
            <div class="countdown">
            </div>
          </div>
        
          <div class="div_for_text_in_note">
          ${todo_note.content}
          </div>
          <div class="div_for_time_and_date_in_note">
          <div>
          Due Date : ${todo_note.DueDate}
          </div>
          <div>
          Due Time : ${todo_note.DueTime}
          </div>
          </div>
        </div>`

      document
        .getElementById('mission_note_creation_container')
        .appendChild(div_without_fade_in_animation)

      display_countdown(todo_note.DueDate, todo_note.DueTime)
    }
  })
  addEventListeners()
}

function display_countdown(user_date, user_time) {
  const countdown_event_creation = document.querySelectorAll('.countdown')

  countdown_event_creation.forEach( (elem,
    index_of_this_countdown_event_creation
  ) => {
    if (
      countdown_event_creation.length - 1 ===
      index_of_this_countdown_event_creation
    ) {
      let target_user_date = new Date(`${user_date} ${user_time}`)

      let timing = setInterval(() => {
        let current_date = new Date().getTime()

        let time_left = target_user_date - current_date

        let days = Math.floor(time_left / (1000 * 60 * 60 * 24))
        if (days < 10) days = '0' + days

        let hours = Math.floor(
          (time_left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        if (hours < 10) hours = '0' + hours

        let minutes = Math.floor((time_left % (1000 * 60 * 60)) / (1000 * 60))
        if (minutes < 10) minutes = '0' + minutes

        let seconds = Math.floor((time_left % (1000 * 60)) / 1000)
        if (seconds < 10) seconds = '0' + seconds

        elem.innerHTML =
          days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's'

        if (time_left <= 0) {
          clearInterval(timing)
          elem.style.borderRadius = '8%'
          elem.style.backgroundColor = '#DC3545'
          elem.style.color = 'white'
          elem.innerHTML = 'The Time Is Over'
        }
      }, 1000)
    }
    return false
  })
}

function capture_click_on_the_remove_button(event) {
  const delete_button = event.srcElement
  const id_of_the_delete_button = delete_button.id
  remove_mission_note(id_of_the_delete_button)
  print_note_missions_to_document_with_no_special_effect()
}

function remove_mission_note(id_of_the_delete_button) {
  todo_note_missions = todo_note_missions.filter((array_of_todos) => {
    if (array_of_todos.id === id_of_the_delete_button) {
      console.log(
        `The note mission with the id ${array_of_todos.id} just got deleted`
      )
      return false
    }
    return true
  })
  save_mission_note_content_to_localstorage()
}

function print_note_missions_to_document_with_no_special_effect() {
  document.getElementById('mission_note_creation_container').innerHTML = ''

  todo_note_missions.forEach((todo_note, index) => {
    const div_without_fade_in_animation = document.createElement('div')

    div_without_fade_in_animation.classList.add(
      'image_background_container_without_animation',
      'box'
    )

    div_without_fade_in_animation.setAttribute('id', 'box_container')
    div_without_fade_in_animation.setAttribute('the_index_of_note', index)

    div_without_fade_in_animation.innerHTML += `
        <div id="draggable_element" class="note_content_container draggable" draggable="true">
      
          <input type="image" src="https://img.icons8.com/color/48/000000/close-window.png" class="input_type_image_button" onclick ="capture_click_on_the_remove_button(event)" id="${todo_note.id}"/></input>

          <div class="container_of_countdown">
            <div class="countdown_header_container">
              <h2 class="countdown_header"> <u>Ends in...</u> </h2>
            </div>
            <div class="countdown">
            </div>
          </div>
        
          <div class="div_for_text_in_note">
          ${todo_note.content}
          </div>
          <div class="div_for_time_and_date_in_note">
          <div>
          Due Date : ${todo_note.DueDate}
          </div>
          <div>
          Due Time : ${todo_note.DueTime}
          </div>
          </div>
        </div>`

    document
      .getElementById('mission_note_creation_container')
      .appendChild(div_without_fade_in_animation)

    display_countdown(todo_note.DueDate, todo_note.DueTime)
  })
  addEventListeners()
}

window.onload = () => {
  if (localStorage.getItem('missions') === null) {
    return
  } else {
    let todo_note_missions_from_localstorage = JSON.parse(
      localStorage.getItem('missions')
    )
    todo_note_missions = todo_note_missions_from_localstorage
    print_note_missions_to_document_with_no_special_effect()
  }
}

function addEventListeners() {
  const draggables_inside_container = document.querySelectorAll('.draggable')

  const box_container_for_draggables = document.querySelectorAll('.box')

  draggables_inside_container.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart)
    draggable.addEventListener('dragend', dragEnd)
  })

  box_container_for_draggables.forEach((box) => {
    box.addEventListener('dragover', dragOver)
    box.addEventListener('drop', dragDrop)
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragleave', dragLeave)
  })
}

let the_index_of_the_first_drag_element

function dragStart() {
  console.log('start...')
  setTimeout(() => (this.className = 'invisible'), 0)
  the_index_of_the_first_drag_element =
    +this.closest('.box').getAttribute('the_index_of_note')
}

function dragEnter() {
  console.log('Event: ' + 'enter new...')
  this.classList.remove('hover_effect')
}

function dragLeave() {
  console.log('Event: ' + 'leave old...')
  this.classList.remove('hover_effect')
}

function dragOver(elem) {
  elem.preventDefault()
  this.classList.add('hover_effect')
  console.log('Event: ' + 'over a note...')
}

function dragDrop() {
  console.log('Event: ' + 'drop...')

  let the_index_of_the_drop_target_element =
    +this.getAttribute('the_index_of_note')

  swapItems(
    the_index_of_the_first_drag_element,
    the_index_of_the_drop_target_element
  )

  this.classList.remove('hover_effect')
}

function dragEnd() {
  console.log('end')
  this.classList.remove('invisible')
  this.classList.add('note_content_container', 'draggable')
}

// Swap list items that are drag and drop

function swapItems(the_draggable_index, the_drop_index) {
  temp = todo_note_missions[the_draggable_index]
  todo_note_missions[the_draggable_index] = todo_note_missions[the_drop_index]
  todo_note_missions[the_drop_index] = temp

  print_note_missions_to_document_with_no_special_effect()
  save_mission_note_content_to_localstorage()
}
