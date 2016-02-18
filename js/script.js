var testDiv = document.querySelector("#test");
var upgradesDiv = document.querySelector("#upgrade");
var countContain = $('#counterContainer');	
var clicker = {
	clickPower: 1
}
var testButton = {			
	counter: 0,
	moneyPerSec: 0,			
	buttonStat: 
		[{ name: 'Button 1', buttonCost: 5, amount: 0, moneyGen: 1, nextUpgradePosition: 0 }, 
		 { name: 'Button 2', buttonCost: 100, amount: 0, moneyGen: 5, nextUpgradePosition: 0 }, 
		 { name: 'Button 3', buttonCost: 1500, amount: 0, moneyGen: 10, nextUpgradePosition: 0 }],
	nextUpgradeTable: [10, 25, 50, 75],			
	buttonClick: function(i) {
		if (testButton.counter < testButton.buttonStat[i].buttonCost) {	return;	}
		testButton.update(i);								
	},
	getCounter: function() {
		return testButton.counter;
	},
	update: function(a) {				
		testButton.counter -= testButton.buttonStat[a].buttonCost;
		testButton.moneyPerSec += testButton.buttonStat[a].moneyGen;				
		countContain.html(testButton.updateMainText());
		testButton.buttonStat[a].amount += 1;
		testButton.buttonStat[a].buttonCost += Math.ceil(testButton.buttonStat[a].buttonCost * 0.15);
		testButton.checkUpgrade(a);
		testDiv.children[a].innerHTML = testButton.updateButtonText(a);
	},
	getName: function(i) {
		console.log(i);
		return testButton.buttonStat[i].name;
	},
	getCost: function(i) {
		return testButton.buttonStat[i].buttonCost;
	},
	getAmount: function(i) {
		return testButton.buttonStat[i].amount;
	},
	getMoneyGen: function(i) {
		return testButton.buttonStat[i].moneyGen;
	},
	getButtonTotal: function(i) {
		return testButton.buttonStat[i].moneyGen * testButton.buttonStat[i].amount;
	},
	updateButtonText: function(i) {
		return testButton.getName(i) + ' | Cost: $' + testButton.getCost(i) + ' | Amount Owned: ' + testButton.getAmount(i) + ' | Money Per Second (Each): $' + testButton.getMoneyGen(i) + ' | Money Per Second (Overall): $' + testButton.getButtonTotal(i);
	},
	updateMainText: function() {
		return '<p class="counter"> Money: $' + testButton.counter + ' | Money Per Sec: $' + testButton.moneyPerSec + '</p>'
	},
	init: function(i) {				
		testButton.moneyPerSec += (testButton.buttonStat[i].moneyGen * testButton.buttonStat[i].amount);
		testDiv.children[i].innerHTML = testButton.updateButtonText(i);
		countContain.html(testButton.updateMainText());					
	},
	updateMoney: function(monPS) {
		testButton.counter += monPS;
		countContain.html(testButton.updateMainText());
		return testButton.counter;				
	},	
	initTimer: function() {
		var self = this;
		setInterval(function() { self.updateMoney(self.moneyPerSec) }, 1000);
	},
	checkUpgrade: function(i) {
		if (testButton.buttonStat[i].amount >= testButton.nextUpgradeTable[testButton.buttonStat[i].nextUpgradePosition]) {
			upgradesDiv.children[i].children[testButton.buttonStat[i].nextUpgradePosition].classList.remove('upgrade-disabled');
			testButton.buttonStat[i].nextUpgradePosition++;
		}				
	},
	upgradeButtonMulti: function(upgradeAmt) {
		return button * upgradeAmt;
	},
	upgradeButtonAdditive: function(upgradeAmt) {
		return button += (button * upgradeAmt);
	}
}

$('#clicker').click(function() {
	countContain.html(testButton.updateMainText());
	return testButton.counter += clicker.clickPower;
});

window.onload = function(){		
	testButton.initTimer();
	for (var i = 0; i < testDiv.children.length; i++) {
		testButton.init(i);
		(function(j){								
			testDiv.children[j].addEventListener("click", function(e) {						
				e.preventDefault();						
				testButton.buttonClick(j);						
			});
		})(i);
	};			
};