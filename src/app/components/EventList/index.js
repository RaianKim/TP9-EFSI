import Link from 'next/link';
import styles from './style.module.css';

export default function EventList() {
  return (
    <div className={styles.container}>
    <div className={styles.eventList}>
      <h1>Listado de Eventos</h1>
      <ul>
        <li>
          <Link className="link" href="/eventos/1"><button>Evento 1</button></Link>
        </li>
        <li>
          <Link className="link" href="/eventos/2"><button>Evento 2</button></Link>
        </li>
        <li>
          <Link className="link" href="/eventos/3"><button>Evento 3</button></Link>
        </li>
      </ul>
    </div>
    </div>
  );
}
