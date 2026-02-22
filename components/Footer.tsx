import { Container } from "@/components/ui/container";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-primary text-white/70 py-12 border-t border-white/10">
            <Container>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full" />
                            <div className="relative h-16 w-40">
                                <Image
                                    src="/images/logo.webp"
                                    alt="Óticas Vizz"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-white/50 font-medium max-w-xs">
                            Curadoria premium de eyewear e tecnologia alemã em lentes. Enxergue o mundo com clareza, estilo e a elegância que você merece.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[
                                { icon: Instagram, href: "https://instagram.com/oticasvizz" },
                                { icon: Facebook, href: "#" },
                                { icon: Twitter, href: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 group"
                                >
                                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Links */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Navegação</h4>
                        <ul className="space-y-3 text-sm font-medium">
                            {[
                                { label: 'Início', href: '#inicio' },
                                { label: 'Armações', href: '#armacoes' },
                                { label: 'Lentes Multifocais', href: '#lentes-multifocais' },
                                { label: 'Tratamentos', href: '#tratamentos' },
                                { label: 'Dúvidas', href: '#faq' },
                                { label: 'Contato', href: '#contato' }
                            ].map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300" />
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Payment */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Pagamento</h4>
                        <p className="text-sm text-white/50 font-medium">Parcele sua visão em até 10x sem juros nos cartões ou aproveite desconto no PIX.</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {/* Visual Payment Badges */}
                            <div className="px-3 py-1.5 glass-panel rounded-md text-[10px] font-bold text-white/60">VISA</div>
                            <div className="px-3 py-1.5 glass-panel rounded-md text-[10px] font-bold text-white/60">MASTERCARD</div>
                            <div className="px-3 py-1.5 glass-panel rounded-md text-[10px] font-bold text-white/60">PIX</div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-center">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                        &copy; {new Date().getFullYear()} Óticas Vizz &bull; Crafted for Visionary People
                    </p>
                </div>
            </Container>
        </footer>
    );
}
