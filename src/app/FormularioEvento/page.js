'use client';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from "../context/TokenContext";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

// Estado inicial del evento
const initialEventState = () => ({
  name: '',
  description: '',
  id_event_category: '',
  id_event_location: '',
  id_tag: '',
  start_date: '',
  duration_in_minutes: '',
  price: '',
  enabled_for_enrollment: false,
  max_assistance: '',
});

const FormularioEvento = () => {
  const { token } = useContext(TokenContext);
  const router = useRouter();
  const [evento, setEvento] = useState(initialEventState());
  const [categorias, setCategorias] = useState([]);
  const [eventLocations, setEventLocations] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const [catRes, locRes, eventsRes] = await Promise.all([
        axios.get('http://localhost:4000/api/event-category/', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:4000/api/event-location/', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:4000/api/event/', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setCategorias(catRes.data || []);
      setEventLocations(locRes.data || []);
      setTags(extractTags(eventsRes.data.collection || []));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error cargando datos. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const extractTags = (events) => {
    const extractedTags = events.reduce((acc, evento) => {
      if (evento.tags && Array.isArray(evento.tags)) {
        evento.tags.forEach(tag => {
          acc[tag.name] = tag;
        });
      }
      return acc;
    }, {});
    return Object.values(extractedTags);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvento({
      ...evento,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(
        'http://localhost:4000/api/event',
        { ...evento },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Evento creado exitosamente');
      setEvento(initialEventState());
      router.push('/');
    } catch (error) {
      setError('Error al crear el evento. Intenta de nuevo.');
    }
  };

  const validateForm = () => {
    if (evento.name.length < 3) {
      setError('El nombre debe tener al menos 3 letras.');
      return false;
    }
    if (evento.description.length < 3) {
      setError('La descripción debe tener al menos 3 letras.');
      return false;
    }
    setError(null);
    return true;
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Crear Evento</h2>

          {error && <p className={styles.error}>{error}</p>}

          <Input
            type="text"
            name="name"
            value={evento.name}
            onChange={handleChange}
            placeholder="Nombre del Evento"
            required
          />

          <textarea
            className={styles.input}
            name="description"
            value={evento.description}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />

          <Select
            name="id_event_category"
            value={evento.id_event_category}
            onChange={handleChange}
            options={categorias}
            placeholder="Seleccionar Categoría"
            required
          />

          <Select
            name="id_event_location"
            value={evento.id_event_location}
            onChange={handleChange}
            options={eventLocations}
            placeholder="Seleccionar Ubicación"
            required
          />

          <Select
            name="id_tag"
            value={evento.id_tag}
            onChange={handleChange}
            options={tags}
            placeholder="Seleccionar Etiqueta"
          />

          <Input
            type="datetime-local"
            name="start_date"
            value={evento.start_date}
            onChange={handleChange}
            required
          />

          <Input
            type="number"
            name="duration_in_minutes"
            value={evento.duration_in_minutes}
            onChange={handleChange}
            placeholder="Duración en minutos"
            required
          />

          <Input
            type="number"
            name="price"
            value={evento.price}
            onChange={handleChange}
            placeholder="Precio"
            required
          />

          <Input
            type="number"
            name="max_assistance"
            value={evento.max_assistance}
            onChange={handleChange}
            placeholder="Máxima Asistencia"
            required
          />

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="enabled_for_enrollment"
              checked={evento.enabled_for_enrollment}
              onChange={handleChange}
            />
            Autorizar para la inscripcion
          </label>

          <button type="submit" className={styles.button}>
            Crear Evento
          </button>
        </form>
      )}
    </div>
  );
};

const Input = ({ type, name, value, onChange, placeholder, required }) => (
  <input
    className={styles.input}
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
  />
);

const Select = ({ name, value, onChange, options, placeholder, required }) => (
  <select
    className={styles.input}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ))}
  </select>
);

export default FormularioEvento;
