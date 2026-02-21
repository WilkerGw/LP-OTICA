import { Container } from "@/components/ui/container";
import { MapPin, Clock, Phone, Smartphone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
    return (
        <section className="section-padding bg-white" id="contato">
            <Container>
                <div className="flex flex-col gap-8 lg:gap-12">
                    {/* Left Column: Info */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl mb-4">
                                Visite Nossa Loja
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Venha conhecer nossa loja e tirar suas duvidas com nossos especialistas.
                            </p>
                        </div>

                        <div className="md:flex md:items-start justify-center space-y-8 md:space-y-0 gap-8 lg:gap-16">
                            {/* Address */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0 group-hover:bg-secondary transition-colors">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Endereço</h3>
                                    <p className="text-muted-foreground">Avenida do Oratório, 4869</p>
                                    <p className="text-muted-foreground">Jardim Guaíaca, Zona Leste</p>
                                    <p className="text-muted-foreground">São Paulo - SP</p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Horário de Atendimento</h3>
                                    <p className="text-muted-foreground font-medium">Segunda a Sábado</p>
                                    <p className="text-muted-foreground">09:30 às 18:00</p>
                                    <p className="text-sm text-muted-foreground mt-1">Domingos e feriados: Fechado</p>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
                                    <Smartphone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Contato</h3>
                                    <div className="space-y-1">
                                        <p className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="w-4 h-4" /> (11) 2362-8799
                                        </p>

                                        <p className="flex items-center gap-2 text-muted-foreground">
                                            <Mail className="w-4 h-4" /> oticasvizz@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center flex-col sm:flex-row gap-4 pt-4">
                            <Button asChild size="lg" className="shadow-lg shadow-secondary/20 rounded-2xl">
                                <a href="https://wa.me/551123628799?text=Olá,%20gostaria%20de%20agendar%20um%20exame%20de%20vista." target="_blank" rel="noopener noreferrer">
                                    <Smartphone className="mr-2 h-5 w-5" />
                                    Fale pelo WhatsApp
                                </a>
                            </Button>
                            <Button asChild size="lg" variant="glass-dark" className="text-primary hover:text-primary rounded-2xl">
                                <a href="https://www.google.com/maps/dir/?api=1&destination=Av.+do+Oratório,+4869+-+Jardim+Guaiaca,+São+Paulo+-+SP" target="_blank" rel="noopener noreferrer">
                                    <MapPin className="mr-2 h-5 w-5" />
                                    Como Chegar
                                </a>
                            </Button>
                        </div>

                        {/* Map moved here */}
                        <div className="h-[350px] rounded-2xl overflow-hidden shadow-lg border border-border bg-muted relative mt-8">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.088657476657!2d-46.52952872374661!3d-23.595995563045437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5d8001d67069%3A0x6b1e6047a0641151!2sAv.%20do%20Orat%C3%B3rio%2C%204869%20-%20Jardim%20Guaiaca%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003221-200!5e0!3m2!1spt-BR!2sbr!4v1707570000000!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
