import type { TournamentStats } from './useTournamentStats';
import styles from './TournamentScorecards.module.css';

export function TournamentScorecards({ stats }: { stats: TournamentStats }) {
  return (
    <div className={styles['stats-grid']}>
      <div className={styles['stat-card']}>
        <div className={styles['stat-label']}>Total Decks</div>
        <div className={styles['stat-value']}>{stats.totalDecks}</div>
      </div>
      <div className={styles['stat-card']}>
        <div className={styles['stat-label']}>Unique Archetypes</div>
        <div className={styles['stat-value']}>
          {stats.totalUniqueArchetypes}
        </div>
      </div>
      <div className={styles['stat-card']}>
        <div className={styles['stat-label']}>Most played</div>
        <div
          className={`${styles['stat-value']} ${styles['stat-value--small']}`}
        >
          {stats.mostPlayedArchetype}
        </div>
      </div>
      <div className={styles['stat-card']}>
        <div className={styles['stat-label']}>Best conversition rate</div>
        <div
          className={`${styles['stat-value']} ${styles['stat-value--small']}`}
        >
          {stats.bestConvertingArchetype}
        </div>
      </div>
    </div>
  );
}
