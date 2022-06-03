import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import './Chatbot.css'
import { Link } from 'react-router-dom'



const theme = {
    background: '#f5f8fb',
    headerBgColor: '#000000',
    headerFontColor: '#F7DC6F',
    headerFontSize: '20px',
    botBubbleColor: '#F7DC6F',
    botBubbleSize: '100%',
    botFontColor: '#000000',
    userBubbleColor: '#000000',
    userFontColor: '#F7DC6F',
}

export default function Contenido(){
    
        return (

            <ThemeProvider theme={theme}>

                <div >
                <div class="fixed-bottom botonAyuda">

                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><img src="https://universitas.space/pluginfile.php/1178/mod_resource/content/1/icono_seo.png" alt="" /></button>
                
                </div>
                    
                <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog allContainerChat">
                <div class="modal-content">
                <button type="button" class="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="mb-3 containerChat">


                        <ChatBot 
                            steps={[
                                {
                                    id: "1",
                                    message: "Hola, soy BarberBot!. Antes de comenzar, cual es tu nombre?",
                                    trigger: "2"
                                },
                                {
                                    id: "2",
                                    user: true,
                                    validator: (value) => {
                                        if (/^[a-z]{2,15}$/.test(value)) {
                                            return true;
                                        }
                                        else {
                                            return 'Please enter a valid name.';
                                        }
                                    },
                                    trigger: "3"
                                },
                                {
                                    id: "3",
                                    message: "Hola {previousValue}, es un placer saludarte!",
                                    trigger: "4"
                                },
                                {
                                    id: "4",
                                    message: "Necesitas algo el dia de hoy?",
                                    trigger: "5"
                                },
                                {
                                    id: "5",
                                    options: [
                                        {value: "y", label: "Si", trigger: "6A"},
                                        {value: "n", label: "No", trigger: "6B"},
                                    ]
                                },
                                {
                                    id: "6A",
                                    message: "Genial! Dime lo que estas buscando...",
                                    trigger: "seleccion"
                                },
                            
                                {
                                    id: "6B",
                                    message: "Gracias por contactarte! *chat finalizado*",
                                    trigger: "reiniciar"
                                },
                                {
                                    id: "reiniciar",
                                    options: [
                                        {value: "n", label: "Reiniciar Chat", trigger: "1"}
                                    ]
                                },
                                {
                                    id: "seleccion",
                                    options: [
                                        {value: "f", label: "Como Comprar", trigger: "7A"},
                                        {value: "b", label: "Como Reservar", trigger: "7B"},
                                    ]
                                },
                            
                                {
                                    id: "7A",
                                    component: (
                                        <div>
                                            <Link to="/comocomprar" target="_blank">
                                                Ingrese Aqui
                                            </Link>
                                        </div>
                                    ),
                                    // asMessage: true,
                                    trigger: "9"
                                },
                                {
                                    id: "7B",
                                    component: (

                                        <div class="accordion" id="accordionExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingTwo">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Como Reservar</button>
                                            </h2>
                                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                            </div>
                                            </div>
                                        </div>
                                        
                                        </div>
                                        // <div>

                                        //     <p class="text-dark">
                                        //          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
                                        //     </p>
                                                
                                        //     <Link to="/comoreservar" target="_blank">
                                        //         +info
                                        //     </Link>
                                            
                                        // </div>
                                    ),
                                    trigger: "9"
                                },
            
                                {
                                    id: "9",
                                    message: "Necesitas algo más el dia de hoy?",
                                    trigger: "respuestaVuelta",
                                }, 
                                {
                                    id: "respuestaVuelta",
                                    options: [
                                        {value: "y", label: "Yes", trigger: "6A"},
                                        {value: "n", label: "No", trigger: "6B"},
                                    ],
                                }
                            ]}
                        />
                </div>
                </div>
                </div>
                </div>
                </div>
            </ThemeProvider>

        )
    
}