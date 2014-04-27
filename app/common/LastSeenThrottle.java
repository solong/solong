package common;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.joda.time.DateTime;
import org.springframework.stereotype.Component;

import play.Logger;

import com.google.inject.Inject;
import com.google.inject.Singleton;

@Component @Singleton
public class LastSeenThrottle {

	private class LastSeenSweeper implements Runnable {
		@Override
		public void run() {
			Logger.debug("Sweeping LastSeen");
			if (lastSeenThrottle == null) {
				Logger.warn("LastSeenThrottle was not injected");
			} else {
				swapOutLastSeenMap().forEach(
						(steamId, lastSeenTime) -> updateLastSeenInDatabase(
								steamId, lastSeenTime));
			}
		}

		private void updateLastSeenInDatabase(String steamId,
				DateTime lastSeenTime) {
			Logger.debug("steamId {}, datetime {}", steamId, lastSeenTime);
			// TODO:jdbctemplate.update where steamid matches and databaselastseentime is less than lastseentime
		}
	}

	@Inject
	private volatile ConcurrentHashMap<String, DateTime> lastSeenThrottle;
	private static ScheduledExecutorService SERVICE = Executors
			.newSingleThreadScheduledExecutor();

	private ConcurrentHashMap<String, DateTime> swapOutLastSeenMap() {
		ConcurrentHashMap<String, DateTime> oldLastSeenThrottle = lastSeenThrottle;
		lastSeenThrottle = new ConcurrentHashMap<String, DateTime>();
		return oldLastSeenThrottle;
	}

	public void updateLastSeen(String steamId) {
		lastSeenThrottle.put(steamId, DateTime.now());
	}

	public LastSeenThrottle() {
		// schedule a runner which calls swapoutlastseenmap and then inserts
		// each value into the database.
		SERVICE.scheduleWithFixedDelay(new LastSeenSweeper(), 0, 10,
				TimeUnit.SECONDS);
	}
}
