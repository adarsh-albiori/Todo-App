import { defineStore } from 'pinia'

export const useStore = defineStore('data', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            statuses: ["To-do", "Pending", "Finished"],
            activeFilter: 'All',

            tasks: [
                {
                    name: 'Go to Gym',
                    status: 'Pending',
                },
                {
                    name: 'Dance Class',
                    status: 'To-do',
                },
                {
                    name: 'Drinking 1 litre water',
                    status: 'Finished',
                },

            ]
        }
    },
    getters: {
        filteredTasks() {
            if (this.activeFilter === "All") {
                return this.tasks;
            }
            return this.tasks.filter((item) => item.status === this.activeFilter);
        },


    },
    actions: {
        filterTodo(type) {
            this.activeFilter = type;
        }
    }

})