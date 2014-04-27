package controllers;

import java.util.Map;

import models.Preference;
import play.cache.Cache;

public class PreferencesDao {

	public void updateTeamForMapAndPlayer(Integer mapId, Integer idealTeam,
			String steamId) {
		// TODO Update the idealTeam value for the given steamid and given mapid
		//remove the value from the cache
		Cache.remove("map"+mapId);
	}

	public Map<Integer,Preference> getTeamPreferencesForPlayer(String steamId) {
		// TODO get team preferences for a given player
		return null;
	}

}
