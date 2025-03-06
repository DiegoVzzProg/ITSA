<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotForgotPassword extends Notification
{
    use Queueable;

    public $token;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $queryParams = http_build_query([
            'token' => $this->token,
            'email' => $notifiable->email,
        ]);
        $url = env('FRONTEND_URL') . "/forgot/password?" . $queryParams;

        return (new MailMessage)
            ->subject('Recupera tu contraseña')
            ->line('Hemos recibido una solicitud para restablecer tu contraseña.')
            ->action('Restablecer Contraseña', $url)
            ->line('Si no solicitaste esto, ignora este mensaje.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
