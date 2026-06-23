 
        /* ==========================================
           1. INTERACTIVE ACADEMIC PLANNER CONTROLLER 
           ========================================== */
        let tasks = []; // Array keeping track of our data objects

        const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');

        // Event handling trigger
        addTaskBtn.addEventListener('click', function() {
            const val = taskInput.value.trim();
            if (val === "") {
                alert("Please type a valid task string first!");
                return;
            }

            // Create object
            const newTask = {
                id: Date.now(),
                text: val,
                completed: false
            };

            tasks.push(newTask);
            taskInput.value = ""; // Reset box
            renderPlanner();
        });

        // DOM Manipulation to render array items
        function renderPlanner() {
            taskList.innerHTML = ""; // Clear active UI elements

            tasks.forEach(function(task) {
                const li = document.createElement('li');
                li.className = "task-item";

                const span = document.createElement('span');
                span.textContent = task.text;
                if (task.completed) {
                    span.className = "completed-task";
                }
                li.appendChild(span);

                const actions = document.createElement('div');

                // Complete action modifier
                const doneBtn = document.createElement('button');
                doneBtn.textContent = "✓";
                doneBtn.style.backgroundColor = "green";
                doneBtn.style.marginRight = "5px";
                doneBtn.onclick = function() {
                    task.completed = !task.completed;
                    renderPlanner();
                };
                actions.appendChild(doneBtn);

                // Delete action modifier
                const delBtn = document.createElement('button');
                delBtn.textContent = "X";
                delBtn.style.backgroundColor = "red";
                delBtn.onclick = function() {
                    tasks = tasks.filter(t => t.id !== task.id);
                    renderPlanner();
                };
                actions.appendChild(delBtn);

                li.appendChild(actions);
                taskList.appendChild(li);
            });
        }

        /* ==========================================
           2. CONTACT FORM BASIC VALIDATION ENGINE 
           ========================================== */
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Halt active browser reloading

            let passed = true;

            const nameVal = document.getElementById('nameInput').value.trim();
            const emailVal = document.getElementById('emailInput').value.trim();
            const phoneVal = document.getElementById('phoneInput').value.trim();
            const msgVal = document.getElementById('msgInput').value.trim();

            // 1. Name Check
            if (nameVal === "") {
                document.getElementById('nameError').style.display = "block";
                passed = false;
            } else {
                document.getElementById('nameError').style.display = "none";
            }

            // 2. Email Pattern Match
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                document.getElementById('emailError').style.display = "block";
                passed = false;
            } else {
                document.getElementById('emailError').style.display = "none";
            }

            // 3. Phone Digits Only Match
            const digitsRegex = /^\d+$/;
            if (!digitsRegex.test(phoneVal)) {
                document.getElementById('phoneError').style.display = "block";
                passed = false;
            } else {
                document.getElementById('phoneError').style.display = "none";
            }

            // 4. Message Content Check
            if (msgVal === "") {
                document.getElementById('msgError').style.display = "block";
                passed = false;
            } else {
                document.getElementById('msgError').style.display = "none";
            }

            // Success Dispatch Trigger
            if (passed) {
                alert("Success! Form data fields validated accurately.");
                document.getElementById('contactForm').reset();
            }
        });
