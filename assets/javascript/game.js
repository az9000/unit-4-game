$(document).ready(function() {

    // default health points
    var defaultHealthPoints = [
        120, 
        100, 
        150, 
        200
    ];
    
    var defaultAttackPowers = [
        10, 
        12, 
        8, 
        6
    ];

    var path = '../assets/images/';

    var hero1 = {
        healthPoints: defaultHealthPoints[0],
        attackPower: defaultAttackPowers[0],
        counterAttackPower: 10,
        picture: 'chewbacca.jpg',
        label: 'Chewbacca',
        defaultHealthPoints: defaultHealthPoints[0],
        reset: function(index) {
            this.healthPoints = defaultHealthPoints[index];
            this.attackPower = defaultAttackPowers[index];
        }
    };

    var hero2 = {
        healthPoints: defaultHealthPoints[1],
        attackPower: defaultAttackPowers[1],
        counterAttackPower: 12,
        picture: 'darth-maul.jpg',
        label: 'Darth Maul',
        defaultHealthPoints: defaultHealthPoints[1],
        reset: function(index) {
            this.healthPoints = defaultHealthPoints[index];
            this.attackPower = defaultAttackPowers[index];
        }
    };

    var hero3 = {
        healthPoints: defaultHealthPoints[2],
        attackPower: defaultAttackPowers[2],
        counterAttackPower: 14,
        picture: 'darth-vader.jpg',
        label: 'Darth Vader',
        defaultHealthPoints: defaultHealthPoints[2],
        reset: function(index) {
            this.healthPoints = defaultHealthPoints[index];
            this.attackPower = defaultAttackPowers[index];
        }
    };

    var hero4 = {
        healthPoints: defaultHealthPoints[3],
        attackPower: defaultAttackPowers[3],
        counterAttackPower: 16,
        picture: 'emperor.jpg',
        label: 'Emperor',
        defaultHealthPoints: defaultHealthPoints[3],
        reset: function(index) {
            this.healthPoints = defaultHealthPoints[index];
            this.attackPower = defaultAttackPowers[index];            
        }
    };


    var heros = [hero1, hero2, hero3, hero4];
    var theHero = null;
    var theDefender = null;
    var enemies = [];


    function init() {
        var index = 0;
        for (var i=1; i<=heros.length; i++) {
            index = i - 1;

            heros[index].reset(index);

            var id = '#hero' + i + '-hp';            
            $(id).text(heros[index].healthPoints + 'HP');
            $(id).show();
            
            id = '#hero' + i + '-pic';
            $(id).attr('src', path + heros[index].picture);
            $(id).show();

            id = '#hero' + i + '-label';
            $(id).text(heros[index].label);
            $(id).show();
        }
        $('#one, #char1, #char2, #char3, #char4').show();

        // hide sections
        $('#two, #three, #four').hide();

        $('.heading1').text('Select A Character');

        $('#hero1-pic').css('opacity', 1);
        $('#hero2-pic').css('opacity', 1);
        $('#hero3-pic').css('opacity', 1);
        $('#hero4-pic').css('opacity', 1);

        theHero = null;
        theDefender = null;
        enemies.length = 0;
    }
    init();

    // Select a character
    $('#char1, #char2, #char3, #char4').on ('click', function() {
        if (!theHero) {
            
            if (this.id === 'char1') {
                setHero(hero1);
                moveToEnemyList(hero2, hero3, hero4);
            } else if (this.id === 'char2') {
                setHero(hero2);
                moveToEnemyList(hero1, hero3, hero4);
            } else if (this.id === 'char3') {
                setHero(hero3);
                moveToEnemyList(hero1, hero2, hero4);
            } else if (this.id === 'char4') {
                setHero(hero4);
                moveToEnemyList(hero1, hero2, hero3);
            } 

            $('#char2, #char3, #char4').hide();
            $('.heading1').text('Your Character');
            $('#two').show();
        }
    });

    // Select an Enemy            
    $('#enemy1, #enemy2, #enemy3').on('click', function() {
        if (!theDefender) {
            if (this.id === 'enemy1') {
                setDefender(0);
            } else if (this.id === 'enemy2') {
                setDefender(1);
            } else if (this.id === 'enemy3') {
                setDefender(2);
            }
        }
    });


    function setHero(hero) {
        theHero = hero;
        $('#hero1-label').text(hero.label);
        $('#hero1-pic').attr('src', path + hero.picture);
        $('#hero1-hp').text(hero.healthPoints + 'HP');
        $('.heading1').text('Your Character');
    }

    function moveToEnemyList(enemy1, enemy2, enemy3) {
        $('#enemy1-label').text(enemy1.label);
        $('#enemy1-pic').attr('src', path + enemy1.picture);
        $('#enemy1-hp').text(enemy1.healthPoints + 'HP');
        $('#enemy1').show();

        $('#enemy2-label').text(enemy2.label);
        $('#enemy2-pic').attr('src', path + enemy2.picture);
        $('#enemy2-hp').text(enemy2.healthPoints + 'HP');
        $('#enemy2').show();

        $('#enemy3-label').text(enemy3.label);
        $('#enemy3-pic').attr('src', path + enemy3.picture);
        $('#enemy3-hp').text(enemy3.healthPoints + 'HP');
        $('#enemy3').show();

        enemies.length = 0;
        enemies.push(enemy1);
        enemies.push(enemy2);
        enemies.push(enemy3);

    }

    function setDefender(index) {
        theDefender = enemies[index];                                
        $('#defender-label').text(theDefender.label);
        $('#defender-pic').attr('src', path + theDefender.picture);
        $('#defender-hp').text(theDefender.healthPoints + 'HP');
        $('#defender-pic').css('opacity', 1);
        $('#three, #four').show();

        $('#msg1').text('');
        $('#msg2').text('');
        $('.defender, .heading4').show();

        var id = '#enemy' + (index + 1);
        $(id).hide();
    }

    // Attack
    $('#attack').on('click', function() {
        if (theDefender && theHero) {
            theDefender.healthPoints -= theHero.attackPower;
            if (theDefender.healthPoints < 0) {
                theDefender.healthPoints = 0;
            }
            var defenderOpacity = theDefender.healthPoints / theDefender.defaultHealthPoints;
            $('#defender-pic').css('opacity', defenderOpacity);
    
            theHero.healthPoints -= theDefender.counterAttackPower;
            if (theHero.healthPoints < 0) {
                theHero.healthPoints = 0;
            }
            var heroOpacity = theHero.healthPoints/theHero.defaultHealthPoints
            $('#hero1-pic').css('opacity', heroOpacity);                
    
            $('#hero1-hp').text(theHero.healthPoints + 'HP');
            $('#defender-hp').text(theDefender.healthPoints + 'HP');
    
            theHero.attackPower += 6;
    
            var msg1 = 'You attacked ' + theDefender.label + ' for ' + theHero.attackPower + ' damage!\n';
            var msg2 = theDefender.label + ' attacked you back for ' + theDefender.counterAttackPower + ' damage!';
                    
            $('#msg1').text(msg1).css('font-size', '16px');
            $('#msg2').text(msg2).css('font-size', '16px');
            
            if (theHero.healthPoints <= 0) {
                // hero loses
                $('#msg1').text('You Lose!').css('font-size', '24px');
                $('#msg2').text('');
                $('#hero1-pic').css('opacity', 1);
                $('#hero2-pic').css('opacity', 1);
                $('#hero3-pic').css('opacity', 1);
                $('#hero4-pic').css('opacity', 1);
                $('.defender, .heading4').hide();
                theHero = null;
                theDefender = null;
            } else if (theDefender.healthPoints <= 0) {
                // defender loses
                $('#msg1').text('You Win!').css('font-size', '24px');
                $('#msg2').text('');
                // remove the old Defender
                $('.defender, .heading4').hide();
                theDefender = null;
            }    
        } else {
            if (!theHero) {
                $('#msg1').text('You Lose!').css('font-size', '24px');
                $('#msg2').text('');
            }
        }
    });

    // reset
    $('#reset').on('click', function() {
        init();
    });

});