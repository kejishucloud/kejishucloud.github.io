---
layout: portal
view: article
lang: es
topic: agents
translation_key: reliable-agent-design
review_status: approved
content_id: reliable-agent-design-es
title: "Arquitectura de agentes de IA fiables"
description: "Cómo diseñar agentes con herramientas, estado, permisos y evaluaciones."
date: 2026-10-13
updated_at: 2026-10-13
author: kejishucloud
permalink: /es/agents/reliable-agent-design/
sources:
  - title: "LangGraph"
    url: "https://docs.langchain.com/oss/python/langgraph/overview"
  - title: "Model Context Protocol"
    url: "https://modelcontextprotocol.io/docs/getting-started/intro"
---

Un agente capaz de llamar herramientas todavía no es un sistema listo para producción. La fiabilidad depende de **límites explícitos**: acciones autorizadas, recuperación ante fallos y aprobación humana.

## 1. ¿Flujo fijo o agente autónomo?

Si los pasos son conocidos, utiliza un flujo determinista. Si el siguiente paso depende de información incierta, considera un agente con límites de iteraciones, tiempo, presupuesto y acceso.

## 2. Separa cuatro capas

- **Tarea:** objetivo, entradas y criterio de finalización.
- **Estado:** progreso, evidencias y errores.
- **Herramientas:** esquemas de entrada, permisos, tiempos de espera y reintentos.
- **Control:** aprobaciones, auditoría y recuperación humana.

Frameworks como LangGraph ayudan a organizar estados, pero no sustituyen la ingeniería de seguridad.

## 3. Aplica permisos mínimos

Empieza con acceso de lectura. Solicita autorización específica para escribir, enviar mensajes, borrar o ejecutar pagos. Los textos obtenidos de páginas y documentos son entradas no fiables: podrían contener instrucciones maliciosas. Mantén las claves fuera de los prompts y registros.

## 4. Evalúa casos difíciles

Además de éxitos, prueba ausencia de datos, errores de API, peticiones duplicadas, permisos insuficientes e inyección de instrucciones. Mide éxito de tareas, coste, latencia, errores y frecuencia de intervención humana. Comprueba las trazas de herramientas, no solo la respuesta final.

## 5. Despliega gradualmente

Empieza con pruebas aisladas; después prueba pilotos pequeños y añade observabilidad. Ejecuta regresiones tras cambiar modelo, prompt o herramienta. Define cuándo suspender tareas y solicitar atención humana.

**Un agente fiable necesita estado, permisos, validación y supervisión.**

### Referencias
- [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)
- [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)
- [OpenAI Evals](https://platform.openai.com/docs/guides/evals)
