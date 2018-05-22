const GAME_DATA = {
    user_details: {
        name: "",
        email: "",
        current_level: 0,
        level2_locked: true,
        level3_locked: true
    },
    blackjack: {
        wins: 0,
    },
    trivia: {
        score: 0,
        current_question: 0,
        round_completed: false
    },
    fruit: {
        score: 0,
    }
};

window.GAME_DATA = GAME_DATA;