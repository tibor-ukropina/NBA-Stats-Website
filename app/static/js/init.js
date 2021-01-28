function appendToTable(i, data){
	$("#body").append(`<tr>`);
	$("#body").append(`<td scope="row"><strong>` + (i + 1) + `</strong></td>`);
	$("#body").append(`<td>` + data.id + `</td>`);
	$("#body").append(`<td>` + data.password + `</td>`);
    $("#body").append(`</tr>`);

}

function games(data){

	for(var i = 0; i < 5; ++i){
		$("#recentGames").append(`<tr>`);
		if(data[i].home_team_score > data[i].visitor_team_score){
			$("#recentGames").append(`<td scope="row"><strong>` + data[i].home_team.full_name + `</strong></td>`);
			$("#recentGames").append(`<td scope="row">` +  data[i].visitor_team.full_name + `</td>`);
		}
		else{
			$("#recentGames").append(`<td scope="row">` + data[i].home_team.full_name + `</td>`);
			$("#recentGames").append(`<td scope="row"><strong>` +  data[i].visitor_team.full_name + `</strong></td>`);
		}
		
		$("#recentGames").append(`<td scope="row">` + data[i].home_team_score + " - " + data[i].visitor_team_score + `</td>`);
		$("#recentGames").append(`</tr>`);
	}
	
}

function game(data){

	$("#recentGames").empty()

	$("#recentGames").append(`<tr>`);
	if( data.home_team_score > data.visitor_team_score){
		$("#recentGames").append(`<td scope="row"><strong>` + data.home_team.full_name + `</strong></td>`);
		$("#recentGames").append(`<td scope="row">` +  data.visitor_team.full_name + `</td>`);
	}
	else{
		$("#recentGames").append(`<td scope="row">` + data.home_team.full_name + `</td>`);
		$("#recentGames").append(`<td scope="row"><strong>` +  data.visitor_team.full_name + `</strong></td>`);	
	}
	
	$("#recentGames").append(`<td scope="row">` + data.home_team_score + " - " + data.visitor_team_score + `</td>`);
	$("#recentGames").append(`</tr>`);

}

function statsTable(data){
	$("#statsBox").append(`<tr>`);
	$("#statsBox").append(`<td scope="row"><strong>` + data.games_played + `</strong></td>`);
	$("#statsBox").append(`<td scope="row">` + data.pts + `</td>`);
	$("#statsBox").append(`<td scope="row">` + data.reb + `</td>`);
	$("#statsBox").append(`<td scope="row">` + data.ast + `</td>`);
	$("#statsBox").append(`<td scope="row">` + data.stl + `</td>`);
	$("#statsBox").append(`<td scope="row">` + data.blk + `</td>`);
    $("#statsBox").append(`</tr>`);
}

function showPlayerInfo(data){

	$("#data").empty()
	$("#data").append(`<li> Name: ` + data.first_name + " " + data.last_name + `</li>`);
	$("#data").append(`<li> Height: ` + data.height_feet + "'" + data.height_inches + `</li>`);
	$("#data").append(`<li> Weight: ` + data.weight_pounds + `</li>`);
	$("#data").append(`<li> Team: ` + data.team.full_name + `</li>`);
}

function teamsTable(data){

	$("#teamsBox").empty()

	let amount = 0;

	if ($("#numTeams").val()){
		if ($("#numTeams").val() < 30 && $("#numTeams").val() > 0){
			amount = $("#numTeams").val()
		}
		else{
			amount = 30
		}
	}

	for (var i = 0; i < amount; ++i){
		$("#teamsBox").append(`<tr>`);
		$("#teamsBox").append(`<td scope="row"><strong>` + data[i].abbreviation + `</strong></td>`);
		$("#teamsBox").append(`<td scope="row">` + data[i].city + `</td>`);
		$("#teamsBox").append(`<td scope="row">` + data[i].name + `</td>`);
		$("#teamsBox").append(`<td scope="row">` + data[i].conference + `</td>`);
		$("#teamsBox").append(`<td scope="row">` + data[i].division + `</td>`);
		$("#teamsBox").append(`</tr>`);
	}
}

$(document).ready(function(){

	$.ajax({
		url: "/games",
		type: 'GET',
		success: function(result){
			console.log(result.data)
			games(result.data)
		}
	})

	$("#erase").click(function(){

		$("#statsBox").empty()
	});


	$("#submitID").click(function(){

		$.ajax({
			data : {
				playerID : $('#playerID').val()
			},
			type : 'POST',
			url : '/nbaPlayers'
		})
		.done(function(data) {
			if (data.error) {
				alert(data.error);
			}
			else {
				console.log(data)
				showPlayerInfo(data);
			}
		});
	});
	
	$("#getStats").click(function(){
		$.ajax({
			data : {
				playerID : $('#playerID').val()
			},
			type : 'POST',
			url : '/playerStats'
		})
		.done(function(data) {
			if (data.error) {
				alert(data.error);
			}
			else {
				console.log(data)
				// console.log(data.data[0].pts)
				statsTable(data.data[0])
			}
		});
	});

	$("#findGame").click(function(){
		$.ajax({
			data : {
				gameID : $('#gameID').val()
			},
			type : 'POST',
			url : '/gameStats'
		})
		.done(function(data) {
			if (data.error) {
				alert(data.error);
			}
			else {
				console.log(data)
				game(data)
			}
		});
	});
	
	$("#showTeams").click(function(){
        $.ajax({
            url: "/teams",
            type: 'GET',
            success: function(result){
				console.log(result.data[0])
				teamsTable(result.data)
            }
        })
	});
	
	
	$("#login").click(function(){
		$.ajax({
			data : {
				username : $('#usernameLogin').val(),
				password : $('#passwordLogin').val()
			},
			type : 'POST',
			url : '/login'
		})
		.done(function(data) {
			if (data.error) {
				alert(data.error);
			}
			else {
				window.location.reload();
			}
		});
    });
    
	$("#get").click(function(){
        $.ajax({
            url: "/data",
            type: 'GET',
            success: function(result){

				var obj = JSON.parse(result);
				console.log(obj);

				$("#body").empty();
				for(var i = 0; i < obj.users.length; ++i){
					console.log(obj.users[i]);
					appendToTable(i, obj.users[i]);
				}
            }
        })
	});
	
	$("#logout").click(function(){
        $.ajax({
            url: "/logout",
            type: 'GET',
            success: function(result){
				console.log("logout");
				window.location.reload();
            }
        })
    });

    $("#post").click(function(){

		$.ajax({
			data : {
				username : $('#usernameInput').val(),
				password : $('#passwordInput').val()
			},
			type : 'POST',
			url : '/users'
		})
		.done(function(data) {

			if (data.error) {
				alert(data.error);
			}
			else {
                alert("New user created! Welcome " + data.username + "!");
			}

		});

    });
    
    $("#put").click(function(){

		$.ajax({
			data : {
				username : $('#usernameInput').val(),
				password : $('#passwordInput').val()
			},
			type : 'PUT',
			url : '/users'
		})
		.done(function(data) {

			if (data.error) {
				alert(data.error);
			}
			else {
                alert("Editing password: " + data.username + "'s password has been updated!");
			}

		});

    });

    $("#del").click(function(){

		$.ajax({
			data : {
				username : $('#usernameInput').val(),
				password : $('#passwordInput').val()
			},
			type : 'DELETE',
			url : '/users'
		})
		.done(function(data) {

			if (data.error) {
				alert(data.error);
			}
			else {
                alert("Deleting user: " + data.username);
			}

		});

    });
});
