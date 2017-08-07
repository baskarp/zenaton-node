import _ from 'lodash';
import { ExternalZenatonException } from '../Common/Exceptions';
import TaskManager from './TaskManager';

class Task {

    constructor(task = null) {

        const taskManager = new TaskManager();

        this.data = {};

        _.each(task, (p, k) => {
            this[k] = p;
        });

        taskManager.setTask(this);

        const dataSetter = (data = null) => {
            if (data) {
                this.setData(data);
            }
            return this;
        }

        return dataSetter;
    }

    setData(data) {
        this.data = data;
    }
}

module.exports = Task;