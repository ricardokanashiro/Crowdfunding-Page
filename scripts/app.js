const body = document.querySelector('body');
const menu_nav = document.querySelector('#header-menu');
const menu_blur = document.querySelector('#menu-blur');
const hamburgerBtn = document.querySelector('.hamburguer-menu-button');

const close_menu_btn = document.querySelector('#close-menu-btn');

const bookmark_btn = document.querySelector('.bookmark-btn');

const back_project_btn = document.querySelector('.back-project-btn');
const rewards_modal = document.querySelector('#back-this-project-modal');

const close_rewards_modal = document.querySelector('#back-this-project-modal img');

const reward_cards = rewards_modal.querySelectorAll('.rewards-card');

const modal_reward_card_pledge_buttons = document.querySelectorAll(
    '.modal-reward-card-pledge-button'
);
const rewards_card_modal_wrapper = document.querySelector(
    '#rewards-card-modal-wrapper'
);
const rewards_modal_completed = document.querySelector(
    '#rewards-modal-completed'
);
const pledge_inputs = document.querySelectorAll('.pledge-value');

const rewards_modal_completed_btn = document.querySelector(
    '#rewards-modal-completed button'
);

const main_collect_reward_btn = document.querySelectorAll(
    'main .collect-reward-btn'
);

window.onload = () => {
    menu_blur.style.height = body.offsetHeight + 'px';
}

window.onresize = () => {
    menu_blur.style.height = body.offsetHeight + 'px';
}

// Toggle Menu

hamburgerBtn.addEventListener('click', openMenu);

function openMenu() {
    menu_nav.classList.add('header-menu-active');
    menu_blur.classList.add('menu-blur-active');
    hamburgerBtn.classList.add('hamburguer-menu-button-active');
}

close_menu_btn.addEventListener('click', closeMenu);

function closeMenu() {
    menu_nav.classList.remove('header-menu-active');
    menu_blur.classList.remove('menu-blur-active');
    hamburgerBtn.classList.remove('hamburguer-menu-button-active');
}

// Bookmark project

bookmark_btn.addEventListener('click', bookmarkProject);

function bookmarkProject() {
    bookmark_btn.classList.toggle('bookmark-btn-active');
}

// Toggle Back-this-project Modal

back_project_btn.addEventListener('click', openModal);

function openModal() {

    if(rewards_modal_completed.classList.contains(
        'reward-card-input-value-area-active'
    )) {
        rewards_modal_completed.classList.remove(
            'reward-card-input-value-area-active'
        )

        rewards_card_modal_wrapper.classList.remove('rewards-card-modal-wrapper-inactive');
    }

    rewards_modal.classList.add('back-this-project-modal-active');
    menu_blur.classList.add('menu-blur-active');
}

close_rewards_modal.addEventListener('click', closeModal);

function closeModal() {
    rewards_modal.classList.remove('back-this-project-modal-active');
    menu_blur.classList.remove('menu-blur-active');
}

// Select Reward

reward_cards.forEach(card => card.addEventListener(
    'click', (event) => selectReward(event)
));

function selectReward(event) {

    let eventTargetParentNode = event.target;

    while (!eventTargetParentNode.classList.contains('rewards-card')) {
        eventTargetParentNode = eventTargetParentNode.parentNode;
    }

    let previous_selected_reward_btn = document.querySelector(
        '.reward-card-select-btn-selected-active'
    );

    let previous_reward_card_input_value_area = document.querySelector(
        '.reward-card-input-value-area-active'
    );

    if (
        !eventTargetParentNode.classList.contains('rewards-card-inactive') && !event.target.classList.contains('modal-reward-card-pledge-button')
    ) {

        if (
            previous_selected_reward_btn && previous_selected_reward_btn !== event.target
        ) { 
            previous_selected_reward_btn.classList.remove(
                'reward-card-select-btn-selected-active'
            );
    
            previous_selected_reward_btn.parentNode.parentNode.parentNode.classList
            .remove(
                'rewards-card-active'
            );
    
            previous_reward_card_input_value_area.classList
            .remove(
                'reward-card-input-value-area-active'
            );
    
            eventTargetParentNode.querySelector('.reward-card-select-btn-selected').classList.add(
                'reward-card-select-btn-selected-active'
            );
    
            eventTargetParentNode.classList.add(
                'rewards-card-active'
            );
    
            eventTargetParentNode.querySelector(
                '.reward-card-input-value-area'
            ).classList.add('reward-card-input-value-area-active');
    
        } else {
    
            eventTargetParentNode.querySelector('.reward-card-select-btn-selected').classList.add(
                'reward-card-select-btn-selected-active'
            );
    
            eventTargetParentNode.classList.add(
                'rewards-card-active'
            );
    
            eventTargetParentNode.querySelector(
                '.reward-card-input-value-area'
            ).classList.add('reward-card-input-value-area-active');
        }
    }
}

// Complete Modal

modal_reward_card_pledge_buttons.forEach(
    btn => btn.addEventListener('click', completeModal)
)

function completeModal(event) {

    let pledgeValueInput = event.target.parentNode.querySelector(
        '.pledge-value'
    );

    if (pledgeValueInput.value !== 0 && pledgeValueInput.value.length !== 0) {

        pledge_inputs.forEach(input => input.value = '');

        let previous_selected_reward_card = document.querySelector(
            '.rewards-card-active'
        );

        previous_selected_reward_card.querySelector('.reward-card-select-btn-selected').classList.remove('reward-card-select-btn-selected-active');

        previous_selected_reward_card.classList.remove(
            'rewards-card-active'
        );

        previous_selected_reward_card.querySelector(
            '.reward-card-input-value-area'
        ).classList.remove('reward-card-input-value-area-active');

        rewards_card_modal_wrapper.classList.add('rewards-card-modal-wrapper-inactive');

        rewards_modal_completed.classList.add(
            'reward-card-input-value-area-active'
        );

    } else {
        window.alert('Put a valid value!');
    }
}

// Close complete modal

rewards_modal_completed_btn.addEventListener('click', closeCompleteModal);

function closeCompleteModal() {
    rewards_modal.classList.remove('back-this-project-modal-active');
    menu_blur.classList.remove('menu-blur-active');
}

// Forward Modal Function 

main_collect_reward_btn.forEach(btn => btn.addEventListener(
    'click', (event) => fowardModalFunction(event, btn)
));

function fowardModalFunction(event, btn) {
    if(!btn.parentNode.parentNode.classList.contains(
        'rewards-card-inactive'
    )) {
        openModal()
    }
}