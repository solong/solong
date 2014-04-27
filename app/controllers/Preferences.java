package controllers;

import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentHashMap;

import models.Player;
import models.Preference;

import org.apache.commons.lang3.Validate;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.inject.Inject;

import play.*;
import play.cache.Cache;
import play.db.DB;
import play.libs.Json;
import play.mvc.*;
import views.html.*;

@Component
public class Preferences extends Controller {

	@Inject
	private PreferencesDao preferencesDao;

	public Result getTeamPreferencesForSteamId() {
		// ensure a steamId is provided
		String steamId = session("steamId");
		try {
			Validate.notEmpty(steamId, "SteamID Missing");
		} catch (NullPointerException | IllegalArgumentException e) {
			return badRequest("SteamID Missing");
		}

		Map<Integer, Preference> result = preferencesDao
				.getTeamPreferencesForPlayer(steamId);
		if (result != null) {
			return ok(Json.toJson(result));
		} else {
			return internalServerError("Data unavailable. Try again shortly");
		}
	}

	public Result updateTeam(Integer mapId, Integer idealTeam) {
		// ensure a steamId is provided
		String steamId = session("steamId");
		try {
			Validate.notEmpty(steamId, "SteamID Missing");
		} catch (NullPointerException | IllegalArgumentException e) {
			return badRequest("SteamID Missing");
		}

		preferencesDao.updateTeamForMapAndPlayer(mapId, idealTeam, steamId);

		return(ok());

	}

}
