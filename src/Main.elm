module Main exposing (..)

import Html exposing (..)
import Html.Attributes
    exposing
        ( type_
        , class
        , style
        , autofocus
        , value
        , placeholder
        , href
        , target
        , src
        , alt
        )
import Html.Events exposing (on, onInput, keyCode)


-- Data Format
-- [{english: word, korean: word}]

import Json.Decode as Json exposing (at, string, Decoder, list)
import Json.Decode.Pipeline as JDP exposing (decode, required, optional)
import Http


-- Main


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , subscriptions = \_ -> Sub.none
        , update = update
        , view = view
        }



-- Definition


type alias Word =
    { english : String
    , korean : String
    }


type alias Model =
    { words : List Word
    , term : String
    }


type Msg
    = LoadTranslationData (Result Http.Error (List Word))
    | HandleSearch String
    | HandleKeyDown Int


initModel : Model
initModel =
    { words = []
    , term = ""
    }


init : ( Model, Cmd Msg )
init =
    initModel
        ! [ Debug.log "Send" <| Http.send LoadTranslationData getWords
          ]



-- Update


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadTranslationData (Ok words) ->
            ( { model | words = words }, Cmd.none )

        LoadTranslationData (Err reason) ->
            let
                _ =
                    reason |> Debug.log "Translation Error"
            in
                ( model, Cmd.none )

        HandleSearch term ->
            ( { model | term = term }, Cmd.none )

        HandleKeyDown key ->
            if key == 27 then
                { model | term = "" } ! [ Cmd.none ]
            else
                model ! [ Cmd.none ]



-- View


onKeyDown : (Int -> msg) -> Attribute msg
onKeyDown tagger =
    on "keydown" (Json.map tagger keyCode)


naverSearchBtn : Model -> Html msg
naverSearchBtn model =
    if String.isEmpty model.term then
        div [] []
    else
        a
            [ class "btn btn-danger"
            , href <| "http://endic.naver.com/search.nhn?sLn=kr&query=" ++ model.term
            , target "_blank"
            ]
            [ text "Naver사전 검색"
            ]


helpText : Html msg
helpText =
    div []
        [ h2 []
            [ text "R Translation Dictionary" ]
        , p
            []
            [ text "ESC - Input Clear" ]
        , div
            [ style
                [ ( "display", "block" )
                , ( "position", "fixed" )
                , ( "top", "2%" )
                , ( "right", "2%" )
                , ( "width", "30px" )
                , ( "height", "30px" )
                ]
            ]
            [ githubBtn ]
        ]


githubBtn : Html msg
githubBtn =
    a
        [ href "https://github.com/kkweon/r-term-dict"
        , target "_blank"
        ]
        [ img [ src "./github.svg", alt "Github" ] [] ]


view : Model -> Html Msg
view model =
    let
        searchBar =
            div [ class "input-group input-group-lg" ]
                [ input
                    [ class "form-control"
                    , type_ "text"
                    , onInput HandleSearch
                    , onKeyDown HandleKeyDown
                    , placeholder "검색어를 입력하세요"
                    , autofocus True
                    , value model.term
                    ]
                    []
                ]

        wordContain : String -> Word -> Bool
        wordContain term { english, korean } =
            let
                newTerm =
                    String.toUpper term |> String.trim
            in
                String.contains newTerm english || String.contains newTerm korean

        words =
            let
                tBody =
                    model.words
                        |> List.filter (wordContain model.term)
                        |> List.map printWord
                        |> tbody []
            in
                table [ class "table" ]
                    [ thead []
                        [ th [ style [ ( "width", "50%" ) ] ] [ text "English" ]
                        , th [ style [ ( "width", "50%" ) ] ] [ text "Korean" ]
                        ]
                    , tBody
                    ]
    in
        div [ class "container" ]
            [ div [ class "row mt-5" ] [ helpText ]
            , div [ class "row" ] [ searchBar ]
            , div [ class "row" ] [ words ]
            , div
                [ style
                    [ ( "bottom", "10%" )
                    , ( "position", "fixed" )
                    , ( "right", "5%" )
                    ]
                ]
                [ naverSearchBtn model
                ]
            ]


printWord : Word -> Html Msg
printWord { english, korean } =
    tr []
        [ td [] [ text english ]
        , td [] [ text korean ]
        ]



-- Helpers


wordDecoder : Decoder Word
wordDecoder =
    decode Word
        |> required "english" string
        |> optional "korean" string "번역이 없어요ㅜㅜ"


wordsDecoder : Decoder (List Word)
wordsDecoder =
    list wordDecoder


getWords : Http.Request (List Word)
getWords =
    Http.get "./translation.json" wordsDecoder
