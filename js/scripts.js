const { createApp } = Vue

createApp({
    data() {
        return {
            submited: false,
            showResult: false,

            name: '',
            description: '',
            ability: 0,
            modifiersPlus: 0,
            modifiersMinus: 0,
            difficulty: 0,
            
            diceResult: 0,
            result: 0,
            degree: 0,

            history: false,
            rolls: [],

            columns: ['#', 'Name', 'Action', 'Ability', 'Modifiers', 'Difficulty', 'Dice Result', 'Result', 'Degree'],
        }
    },
    mounted() {
        this.rolls = JSON.parse(localStorage.getItem('rolls')) || [];
        this.history = JSON.parse(localStorage.getItem('history')) || this.history;
    },
    methods: {
        togglePage() {
            this.history = !this.history;
            localStorage.setItem('history', this.history);
        },
        onSubmit(event) {
            this.submited = true;
            if (!this.description || !this.name || !this.difficulty) { return; }

            this.diceResult = this.rollDice();
            this.result = this.calcResult(this);
            this.degree = this.successDegree();

            this.saveLocal();
            this.showResult = true;
        },
        rollDice() {
            return Math.round(Math.random() * (20 - 1) + 1)
        },
        calcResult(obj) {
            return obj.diceResult + obj.ability + obj.modifiersPlus - obj.modifiersMinus;
        },
        successDegree() {
            const degree = this.result - this.difficulty;

            if (degree >= 0) { return Math.abs(Math.floor(degree / 5)) + 1; }
            else { return Math.abs(Math.ceil(degree / 5)); }
        },
        saveLocal() {
            this.rolls.push({
                name: this.name,
                description: this.description,
                ability: this.ability,
                modifiersPlus: this.modifiersPlus,
                modifiersMinus: this.modifiersMinus,
                difficulty: this.difficulty,
                diceResult: this.diceResult,
                result: this.result,
                degree: this.degree,
            });

            localStorage.clear();
            localStorage.setItem('rolls', JSON.stringify(this.rolls));
        },
        resetForm() {
            this.showResult = false;
            this.submited = false;
            
            this.name = '';
            this.description = '';
            this.ability = 0;
            this.modifiersPlus = 0;
            this.modifiersMinus = 0;
            this.difficulty = 0;
            
            this.diceResult = 0;
            this.result = 0;
            this.degree = 0;
        }
    }
}).mount('#app')
