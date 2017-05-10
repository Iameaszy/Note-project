(function () {
    function Notes() {
        this.notes = localStorage.getItem('notes');
        this.select = document.querySelector('select');
        this.text = document.querySelector('textarea');
        this.button = document.querySelectorAll('button');
        this.initialize();
    }//Comment readded

    Notes.prototype = {
        initialize: function () {
            if(this.notes) {
                this.notes = JSON.parse(this.notes);
                for(var prop in this.notes)
                    if(this.notes.hasOwnProperty(prop)) {
                        this.addNote(this.notes[prop]);
                        this.addTitle(prop);
                        this.saveToStorage();
                    }
            } else(this.notes = {});
            this.create(this.button, this.text);
        },
        create: function (button, text) {
            var that = this;
            for(var i = button.length; i--;) {
                this.addEvent(button[i], 'click', main);
            }

            this.addEvent(that.select, 'change', function (e) {
                var value = e.target.value;
                text.value = that.notes[value];
            });

            this.addEvent(that.text, 'blur', function (e) {
                var value = that.select.value;
                that.notes[value] = this.value;
                that.saveToStorage();
            });

            function main() {
                if(this.name == "new") {
                    var title = prompt("Enter note title: ", "");
                    if(title && typeof title.value !== "number") {
                        if(that.notes[title]) {
                            alert("Name already exist");
                            return;
                        }
                        that.notes[title] = "";
                        that.addTitle(title);
                        that.addNote(that.notes[title]);
                        that.saveToStorage();
                    }
                } else if(this.name == "delete") {
                    var titl = prompt('Enter note name: ', "");
                    if(titl && that.notes.hasOwnProperty(titl))
                        that.remove(titl, that.select);
                } else {
                    that.removeAll(that.select);
                }
            }
        },
        saveToStorage: function () {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },
        addNote: function (note) {
            this.text.focus();
            this.text.value = note;
        },
        addTitle: function (name) {
            var option = document.createElement('option');
            option.textContent = name;
            option.selected = 'selected';
            this.select.appendChild(option);
        },
        remove: function (name, select) {
            var children = select.children;
            for(var i = 0, len = children.length; i < len; i++) {
                if(children[i].textContent === name) {
                    select.removeChild(children[i]);
                    delete this.notes[name];
                    this.saveToStorage();
                }
            }
            if(select.children.length === 0)
                this.text.textContent = "";
        },
        removeAll: function (select) {
            localStorage.clear();
            var children = select.children;
            for(var i = children.length ; i--; ) {
                select.removeChild(children[i]);
            }
            this.notes = {};
            this.text.value = "";
        },
        addEvent: function (scope, event, funct) {
            scope.addEventListener(event, funct);
        }
    };
    var NoteApp = new Notes();
})();
