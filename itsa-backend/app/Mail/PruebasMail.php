<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PruebasMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nombre;
    /**
     * Create a new message instance.
     */
    public function __construct($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('Bienvenido a nuestra plataforma')
            ->view('email'); // Vista que se usará para el correo
    }
}
