import { useState, useEffect } from 'react'
import './App.css'
import humanoVsIa from './assets/Humano vs IA_ Duelo de Neón.png'

function App() {
  const [pantalla, setPantalla] = useState('inicio')
  const [respuestaHumano, setRespuestaHumano] = useState('')
  const [retoSeleccionado, setRetoSeleccionado] = useState(0)

  useEffect(() => {
  if (pantalla === 'analizando') {
    const temporizador = setTimeout(() => {
      setPantalla('ia')
    }, 3000)

    return () => clearTimeout(temporizador)
  }
}, [pantalla])
const pasos = [
  { id: 'inicio', nombre: 'Inicio' },
  { id: 'seleccion', nombre: 'Retos' },
  { id: 'reto', nombre: 'Desafío' },
  { id: 'humano', nombre: 'Humano' },
  { id: 'ia', nombre: 'Análisis de la IA' },
  { id: 'comparacion', nombre: 'Resultado' },
]


const obtenerPasoActual = () => {
  if (pantalla === 'analizando') return 4

  return pasos.findIndex((paso) => paso.id === pantalla)
}
const BarraProgreso = () => {
  const pasoActual = obtenerPasoActual()

  return (
    <div className="barra-progreso">
      {pasos.map((paso, index) => (
        <div className="paso-progreso" key={paso.id}>
          <div
            className={`circulo-progreso ${
              index <= pasoActual ? 'activo' : ''
            }`}
          >
            {index + 1}
          </div>

          <span>{paso.nombre}</span>

          {index < pasos.length - 1 && (
            <div
              className={`linea-progreso ${
                index < pasoActual ? 'completada' : ''
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

  const retos = [
  {
    titulo: 'Organización del tiempo',
    icono: '📚',
    descripcion:
      'Un estudiante tiene que organizar su tiempo para completar tres tareas importantes en un solo día.',
    pregunta:
      '¿Cómo organizarías su tiempo y qué factores tendrías en cuenta para tomar la mejor decisión?',
    respuestaIA:
      'Primero identificaría las tareas según su importancia y fecha límite. Después estimaría cuánto tiempo necesita cada una y organizaría un horario priorizando las más urgentes, dejando tiempo para posibles imprevistos.'
  },
  {
    titulo: 'Resolución de problemas',
    icono: '🧠',
    descripcion:
      'Un equipo de estudiantes tiene dificultades para terminar un proyecto porque sus integrantes no logran ponerse de acuerdo.',
    pregunta:
      '¿Cómo solucionarías el problema y conseguirías que todos colaboren?',
    respuestaIA:
      'Primero identificaría las causas del desacuerdo. Después escucharía las propuestas de cada integrante, distribuiría responsabilidades y establecería objetivos comunes con fechas de entrega.'
  },
  {
    titulo: 'Toma de decisiones',
    icono: '⚖️',
    descripcion:
      'Un estudiante tiene dos opciones para realizar un proyecto: una es rápida, pero tiene pocos recursos; la otra requiere más tiempo, pero ofrece mejores resultados.',
    pregunta:
      '¿Qué opción elegirías y qué aspectos evaluarías antes de decidir?',
    respuestaIA:
      'Compararía el tiempo disponible, los recursos, los beneficios y los posibles riesgos de cada alternativa. Elegiría la opción que ofrezca el mejor equilibrio entre calidad y viabilidad.'
  },
  {
    titulo: 'Pensamiento creativo',
    icono: '💡',
    descripcion:
      'Un grupo de estudiantes quiere crear una campaña para reducir el uso de plástico en su institución educativa.',
    pregunta:
      '¿Qué idea propondrías para motivar a los estudiantes a participar?',
    respuestaIA:
      'Propondría una campaña con retos semanales, puntos por reducir el uso de plástico, estaciones de reciclaje y difusión de consejos mediante afiches y redes sociales.'
  }
]

const retoActual = retos[retoSeleccionado]
const respuestaIA = retoActual.respuestaIA

  return (
    <main className="app">
      <BarraProgreso />
      {/* ================= INICIO ================= */}
      {pantalla === 'inicio' && (
        <section className="inicio">
          <p className="etiqueta">EXPERIMENTO INTERACTIVO</p>

          <h1>
            HUMANO <span>VS</span> IA
          </h1>

          <h2>
            ¿La inteligencia artificial complementa o reemplaza las
            capacidades humanas?
          </h2>

          <p className="descripcion">
            Resuelve un problema y compara tu razonamiento con una
            propuesta generada por inteligencia artificial.
          </p>
          <div className="imagen-principal">
  <img
    src={humanoVsIa}
    alt="Humano versus Inteligencia Artificial"
  />
</div>

          <div className="versus">
            <div className="participante">
              
              <h3>HUMANO</h3>
              <p>Creatividad • Experiencia • Pensamiento crítico</p>
            </div>

            <div className="vs">VS</div>

            <div className="participante">
              
              <h3>INTELIGENCIA ARTIFICIAL</h3>
              <p>Velocidad • Datos • Procesamiento</p>
            </div>
          </div>

          <button
            className="boton-comenzar"
            onClick={() => setPantalla('seleccion')}
          >
            COMENZAR EXPERIENCIA →
          </button>
        </section>
      )}
      {/* ================= SELECCION DE RETOS ================= */}
{pantalla === 'seleccion' && (
  <section className="reto">

    <p className="etiqueta">ELIGE TU EXPERIENCIA</p>

    <h1> SELECCIONA UN RETO</h1>

    <p className="descripcion">
      Elige un desafío y demuestra cómo resolverías una situación
      utilizando tu propio razonamiento.
    </p>

    <div className="selector-retos">
      {retos.map((reto, index) => (
        <button
          key={index}
          className="tarjeta-selector"
          onClick={() => {
            setRetoSeleccionado(index)
            setRespuestaHumano('')
            setPantalla('reto')
          }}
        >
          <span className="icono-selector">
            {reto.icono}
          </span>

          <h3>{reto.titulo}</h3>

          <p>{reto.descripcion}</p>

          <span className="texto-seleccionar">
            SELECCIONAR RETO →
          </span>
        </button>
      ))}
    </div>

    <button
      className="boton-volver"
      onClick={() => setPantalla('inicio')}
    >
      ← VOLVER AL INICIO
    </button>

  </section>
)}

      {/* ================= RETO ================= */}
      {pantalla === 'reto' && (
        <section className="reto">
          <p className="etiqueta">FASE 1 DE LA EXPERIENCIA</p>

          <h1>🧩 EL RETO</h1>

          <p className="descripcion">
            Analiza el problema antes de observar la propuesta de la IA.
          </p>

          <div className="tarjeta-reto">
            <h2>{retoActual.icono} {retoActual.titulo}</h2>

            <p>{retoActual.descripcion}</p>

<p>{retoActual.pregunta}</p>
          </div>

          <button
            className="boton-comenzar"
            onClick={() => setPantalla('humano')}
          >
            COMENZAR A RESOLVER →
          </button>

          <button
            className="boton-volver"
            onClick={() => setPantalla('inicio')}
          >
            ← VOLVER
          </button>
        </section>
      )}

      {/* ================= HUMANO ================= */}
      {pantalla === 'humano' && (
        <section className="reto">
          <p className="etiqueta">FASE 2 DE LA EXPERIENCIA</p>

          <h1> TU RESPUESTA</h1>

          <p className="descripcion">
            Resuelve el problema utilizando tu propio razonamiento.
          </p>

          <textarea
            className="respuesta"
            value={respuestaHumano}
            onChange={(e) => setRespuestaHumano(e.target.value)}
            placeholder="Escribe aquí tu respuesta..."
          />
          <p className="mensaje-respuesta">
  {respuestaHumano.trim().length < 20
    ? 'Escribe un poco más sobre tu razonamiento para poder realizar la comparación.'
    : ' ¡Perfecto! Tu respuesta está lista para comparar con la propuesta de la IA.'}
</p>

          <button
            className="boton-comenzar"
            disabled={respuestaHumano.trim().length < 20}
            onClick={() => setPantalla('analizando')}
          >
            VER RESPUESTA DE LA IA →
          </button>

          <button
            className="boton-volver"
            onClick={() => setPantalla('reto')}
          >
            ← VOLVER AL RETO
          </button>
        </section>
      )}
{/* ================= ANALIZANDO ================= */}
{pantalla === 'analizando' && (
  <section className="reto pantalla-analizando">
    <p className="etiqueta">FASE 3 DE LA EXPERIENCIA</p>

    <div className="robot-analizando">🤖</div>

    <h1>LA IA ESTÁ ANALIZANDO...</h1>

    <p className="descripcion">
      Procesando el problema y generando una posible propuesta.
    </p>

    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <p className="texto-espera">
      Comparando diferentes factores y posibles soluciones...
    </p>

   
  </section>
)}

      {/* ================= IA ================= */}
      {pantalla === 'ia' && (
        <section className="reto">
          <p className="etiqueta">FASE 3 DE LA EXPERIENCIA</p>

          <h1> PROPUESTA DE LA IA</h1>

          <div className="tarjeta-reto">
            <h2>Análisis de la IA</h2>
            <p>{respuestaIA}</p>
          </div>

          <button
            className="boton-comenzar"
            onClick={() => setPantalla('comparacion')}
          >
            COMPARAR RESULTADOS →
          </button>

          <button
            className="boton-volver"
            onClick={() => setPantalla('humano')}
          >
            ← EDITAR MI RESPUESTA
          </button>
        </section>
      )}

      {/* ================= COMPARACIÓN ================= */}
{pantalla === 'comparacion' && (
  <section className="reto">
    <p className="etiqueta">RESULTADO FINAL</p>

    <h1>📊 COMPARACIÓN</h1>

    <p className="descripcion">
      Observa cómo el ser humano y la inteligencia artificial pueden
      aportar diferentes fortalezas para resolver un mismo problema.
    </p>

    <div className="comparacion">
      <div className="participante humano-card">
        

        <h3>TU RESPUESTA</h3>

        <p>{respuestaHumano}</p>

        <div className="fortalezas">
          <h4>FORTALEZAS HUMANAS</h4>

          <div className="fortaleza">
            <span>🧠</span>
            <div>
              <strong>Creatividad</strong>
              <p>Puede generar ideas desde diferentes perspectivas.</p>
            </div>
          </div>

          <div className="fortaleza">
            <span>🎯</span>
            <div>
              <strong>Criterio</strong>
              <p>Considera experiencias y situaciones reales.</p>
            </div>
          </div>

          <div className="fortaleza">
            <span>💡</span>
            <div>
              <strong>Experiencia</strong>
              <p>Utiliza conocimientos adquiridos en situaciones previas.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="participante ia-card">
        

        <h3>RESPUESTA DE LA IA</h3>

        <p>{respuestaIA}</p>

        <div className="fortalezas">
          <h4>FORTALEZAS DE LA IA</h4>

          <div className="fortaleza">
            <span>⚡</span>
            <div>
              <strong>Velocidad</strong>
              <p>Procesa información en poco tiempo.</p>
            </div>
          </div>

          <div className="fortaleza">
            <span>📊</span>
            <div>
              <strong>Procesamiento</strong>
              <p>Puede analizar grandes cantidades de información.</p>
            </div>
          </div>

          <div className="fortaleza">
            <span>🔍</span>
            <div>
              <strong>Análisis</strong>
              <p>Encuentra patrones y posibles alternativas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="resultado-final">
      <div className="resultado-icono">🤝</div>

      <div>
        <p className="resultado-etiqueta">MEJOR EN CONJUNTO</p>
        <h2>HUMANO + IA</h2>

        <p>
          La inteligencia artificial no necesariamente reemplaza las
          capacidades humanas. Puede complementar el razonamiento humano,
          combinando creatividad y criterio con velocidad y procesamiento.
        </p>
      </div>
    </div>

    <button
      className="boton-comenzar"
      onClick={() => {
        setRespuestaHumano('')
        setPantalla('inicio')
      }}
    >
      VOLVER AL INICIO
    </button>
  </section>
)}
<footer className="firma">
  <span>Desarrollado por <strong>Santiago</strong></span>
  <span className="separador">•</span>
  <span><strong>GRUPO 1</strong></span>
</footer>
    </main>
  )
}

export default App
