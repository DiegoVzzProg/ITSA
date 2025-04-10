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
    private $urlHostFrontend = "http://localhost:5173";
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
        $url = $this->urlHostFrontend . "/forgot/password?" . $queryParams;

        return (new MailMessage)
            ->subject('Recover your password')
            ->line('We have received a request to reset your password.')
            ->action('Reset Password', $url)
            ->line('If you did not request this, ignore this message.');
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
