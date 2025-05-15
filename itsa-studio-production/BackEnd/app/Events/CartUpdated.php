<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CartUpdated implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $carrito;
    public $totales;
    public $total_productos;
    /**
     * Create a new event instance.
     */
    public function __construct($data)
    {
        $this->carrito = $data['carrito'];
        $this->totales = $data['totales'];
        $this->total_productos = $data['total_productos'];
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // Cambia a un canal público
        return [
            new Channel('cart-channel'), // Nombre del canal
        ];
    }

    public function broadcastAs()
    {
        return 'cart.updated';
    }
}
