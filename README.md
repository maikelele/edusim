# EduSim - Dokumentacja

## Spis treści
1. [Wprowadzenie](#wprowadzenie)
2. [Struktura projektu](#struktura-projektu)
3. [Instalacja](#instalacja)
4. [Uruchomienie](#uruchomienie)
5. [API](#api)
6. [Pliki statyczne](#pliki-statyczne)
7. [Baza danych](#baza-danych)
8. [Opis funkcji](#opis-funkcji)
    - [Funkcje matematyczne](#funkcje-matematyczne)
    - [Symulacje fizyczne](#symulacje-fizyczne)
    - [Algorytmy sortowania](#algorytmy-sortowania)

## Wprowadzenie
EduSim to aplikacja webowa umożliwiająca interaktywne symulacje matematyczne, fizyczne i informatyczne. Użytkownicy mogą logować się, rejestrować, a także zapisywać i odczytywać swoje symulacje.

## Struktura projektu

### Ważne pliki i katalogi
- `public/` - Pliki statyczne (HTML, CSS, JS)
- `src/` - Pliki serwera (Express.js)
- `database/` - Skrypty SQL do zarządzania bazą danych
- `package.json` - Plik konfiguracyjny npm
- `resources` - Multimedia wyświetlane na stronie

## Instalacja
1. Sklonuj repozytorium:
    ```sh
    git clone <URL_REPOZYTORIUM>
    ```
2. Przejdź do katalogu projektu:
    ```sh
    cd projekt
    ```
3. Zainstaluj zależności:
    ```sh
    npm install
    ```

## Uruchomienie
1. Przejdź do katalogu `src`:
```sh
cd src/
```
2. Uruchom plik `server.js`:
```sh
node server.js
```

Serwer będzie dostępny pod adresem `http://localhost:4012`.

## API
### Endpoints
- `POST /login` - Logowanie użytkownika
- `POST /register` - Rejestracja użytkownika
- `POST /savePlot` - Zapisanie wykresu matematycznego
- `POST /getPlots` - Pobranie zapisanych wykresów
- `POST /saveSorting` - Zapisanie parametrów sortowania
- `POST /getSorting` - Pobranie zapisanych parametrów sortowania
- `POST /savePhysics` - Zapisanie parametrów fizycznych
- `POST /getPhysics` - Pobranie zapisanych parametrów fizycznych

## Pliki statyczne
Pliki statyczne znajdują się w katalogu `public/`. Zawierają one:
- HTML (`index.html`, `login.html`, `register.html`, `math.html`, `physics.html`, `sorting.html`)
- CSS (`styles.css`)
- JavaScript (`index.js`, `login.js`, `register.js`, `math.js`, `physics.js`, `sorting.js`)

## Baza danych
Baza danych jest zarządzana za pomocą skryptów SQL znajdujących się w katalogu `database/`. Główne tabele to:
- `user_credentials` - Przechowuje dane użytkowników
- `math_functions` - Przechowuje funkcje matematyczne
- `user_functions` - Przechowuje powiązania użytkowników z funkcjami matematycznymi
- `algorithm` - Przechowuje algorytmy sortowania
- `sorting_speed` - Przechowuje prędkości sortowania
- `user_sorting` - Przechowuje powiązania użytkowników z algorytmami sortowania
- `acceleration_values` - Przechowuje wartości przyspieszenia
- `velocity_values` - Przechowuje wartości prędkości
- `usr_acc_vel` - Przechowuje powiązania użytkowników z wartościami przyspieszenia i prędkości

### Funkcje matematyczne
Aplikacja umożliwia rysowanie wykresów funkcji matematycznych. Użytkownik może wybrać funkcję z listy lub wprowadzić własny wzór funkcji. Wykresy są rysowane na płótnie HTML5.

#### Przykładowe funkcje:
- `x * x`
- `Math.sin(x)`
- `Math.cos(x)`
- `Math.exp(x)`
- `Math.log(x)`

### Symulacje fizyczne
Aplikacja umożliwia symulację ruchu jednostajnego. Użytkownik może wprowadzić prędkość początkową i przyspieszenie, a następnie uruchomić symulację.

#### Przykładowe parametry:
- Prędkość początkowa: 1000 px/s
- Przyspieszenie: 500 px/s²

### Algorytmy sortowania
Aplikacja umożliwia wizualizację algorytmów sortowania. Użytkownik może wybrać algorytm z listy oraz ustawić prędkość sortowania.

#### Przykładowe algorytmy:
- Sortowanie bąbelkowe
- Sortowanie przez wybieranie