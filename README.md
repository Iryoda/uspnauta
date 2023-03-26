# UspNauta

A ideia é ser um aplicativo com funcionalidades uteís para o estudante comum da USP. Sinceramente, eu só queria testar fazer um WebScrapper, testar o Expo Router e usar Go em um projeto. Quando eu tiver afim vou implemetando o que minha mente e boa vontade invetarem.

## Funcionalidades

- Ver Cardapio da Semana de um campus específico.

## Estrutura

Isso é um `Monorepo` ou seja nesse repositório encontra-se varios componentes indepedentes, mas que precisam estar juntos para o funcionamento do projeto

| Pasta     | O que é                                                             |
| --------- | ------------------------------------------------------------------- |
| App       | Aplicativo mobile em React Native, TailwindCSS, Expo e Expo Router. |
| Back      | Rest api em Go usando Echo, nada demais.                            |
| Sauroneye | WebScrapper em Go que busca as informações do cardapio.             |

## Tech Mais a fundo

É bem simples, tenho um webScrapper (sauroneye) que busca no site do Rucard as informações do cardapio da USP e guarda essas informações em uma instância de Memcached como JSON. O aplicativo faz uma requisicão para a api (Back) e este retorna um JSON com as informações.

`Pq MemCached?`

Não tem necessidade de um banco, é só um JSON com as informações que duram uma semana. Ter um banco aqui é desncessário e caro. Quero rodar isso em só uma instância de máquina e rodar banco sem ser managed é péssimo.

`Pq Go?`

Acho Go uma linguagem legal e simples. Super Simples.

- Tem Perfomace (Vai lidar com mais request em maquina ruim)
- Compilada (Facilidade de deploy)
- Pouco Setup (Precisa de pouca config)
- Tipada
  Mas typescript aqui seria também muito bom, principalmente para o webscrapper
