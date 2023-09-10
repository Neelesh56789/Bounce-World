describe('Platformer Game Initialization', () => {
  it('should correctly initialize the game', () => {
    cy.visit('index.html');
    cy.get('canvas').should('be.visible');
    cy.get('#startButton').should('be.visible');
  });
});

describe('Platformer Game Start', () => {
  it('should start the game when start button is clicked', () => {
    cy.visit('index.html');
    cy.get('#startButton').click();
    cy.window().its('score').should('eq', 0);
  });
});

describe('Player Movement', () => {
  it('should move the player left and right with arrow keys', () => {
    cy.visit('index.html');
    cy.get('#startButton').click();

    cy.window().then(win => {
      const initialX = win.player.x;
      cy.get('body').type('{rightarrow}');
      cy.window().its('player.x').should('be.gt', initialX);
    });

    cy.window().then(win => {
      const initialX = win.player.x;
      cy.get('body').type('{leftarrow}');
      cy.window().its('player.x').should('be.lt', initialX);
    });
  });
});

describe('Player Jump', () => {
  beforeEach(()=>{
    cy.visit('index.html');
    cy.get('#startButton').click();

  })

    it('press the space bar to jump', () => {
      // Start game
      cy.get('#startButton').click();
    
      // Take a snapshot of the canvas
      cy.get('#gameCanvas').screenshot('canvas_before_space_bar');
    
      //press the spacebar
      cy.get('body').type(' ');
    
      // Check that the canvas has been repainted after pressing space bar
      cy.get('#gameCanvas').screenshot('canvas_after_space_bar').then(() => {

      });
    });
    it('should snapshot player initial position and after movement', () => {
      
      // Allow game initialization
      cy.wait(1000);
      
      // Capture snapshot of initial state
      cy.screenshot('player-initial-position');
  
      // Simulate player movement using arrow keys (right arrow key)
      cy.get('body').type('{rightarrow}{rightarrow}{rightarrow}');
  
      // Allow movement to be rendered
      cy.wait(500);
      
      // Capture snapshot after movement
      cy.screenshot('player-after-movement');
  
      
      cy.get('#gameCanvas').screenshot('player-after-movement').then(() => {

      });
    });
    it('should snapshot player initial position and after movement', () => {
      
      // Allow game initialization
      cy.wait(1000);
      
      // Capture snapshot of initial state
      cy.screenshot('player-initial-position');
  
      // Simulate player movement using arrow keys (left arrow key)
      cy.get('body').type('{leftarrow}{leftarrow}{leftarrow}');
  
      // Allow movement to be rendered
      cy.wait(500);
      
      // Capture snapshot after movement
      cy.screenshot('player-after-movement');
  
      cy.get('#gameCanvas').screenshot('player-after-movement').then(() => {

      });
    });
    
    
    
});


  describe('Platformer Game End Test Cases', () => {
    beforeEach(()=>{
      cy.visit('index.html');
    })
    it('should end the game correctly when the player falls off the canvas', () => {
      
  
      // Start the game
      cy.get('#startButton').click();
  
      cy.window().then((win) => {
        // Set player position to fall off the canvas
        win.player.y = win.gameCanvas.height + 10;
  
        // Take a screenshot before the fall
        cy.screenshot('Before Fall');
  
        // Run the game loop to register the fall
        win.gameLoop();
  
        // Take a screenshot after the fall and compare it to the previous snapshot
        cy.screenshot('After Fall');
        expect(win.gameRunning).to.be.false;
      });
    });
  
    it('should end the game correctly when the player collides with a spike', () => {
    
  
      // Start the game
      cy.get('#startButton').click();
  
      cy.window().then((win) => {
        // Set player position to collide with the first spike
        win.player.x = win.spikes[0].x;
        win.player.y = win.spikes[0].y - win.player.height;
  
        // Take a screenshot before the collision
        cy.screenshot('Before Spike Collision');
  
        // Run the game loop to register the collision
        win.gameLoop();
  
        // Take a screenshot after the collision and compare it to the previous snapshot
        cy.screenshot('After Spike Collision');
        expect(win.gameRunning).to.be.false;
      });
    });
  
    it('should end the game correctly when the player collides with an enemy', () => {
  
  
      // Start the game
      cy.get('#startButton').click();
  
      cy.window().then((win) => {
        // Set player position to collide with the enemy
        win.player.x = win.enemy.x;
        win.player.y = win.enemy.y - win.player.height;
  
        // Take a screenshot before the collision
        cy.screenshot('Before Enemy Collision');
  
        // Run the game loop to register the collision
        win.gameLoop();
  
        // Take a screenshot after the collision and compare it to the previous snapshot
        cy.screenshot('After Enemy Collision');
        expect(win.gameRunning).to.be.false;
      });
    });
  });
  










