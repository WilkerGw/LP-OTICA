import { Container } from "@/components/ui/container";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-white/70 py-12 border-t border-white/10">
            <Container>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white font-heading">Óticas Vizz</h3>
                        <p className="text-sm leading-relaxed text-white/60">
                            Sua visão merece o melhor. Tecnologia de ponta e estilo para você enxergar o mundo com clareza.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-secondary transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-secondary transition-colors"><Twitter className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Column 2: Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Navegação</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><a href="#" className="hover:text-secondary transition-colors">Início</a></li>
                            <li><a href="#multifocais" className="hover:text-secondary transition-colors">Lentes Multifocais</a></li>
                            <li><a href="#tratamentos" className="hover:text-secondary transition-colors">Tratamentos</a></li>
                            <li><a href="#contato" className="hover:text-secondary transition-colors">Contato</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Institucional</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><a href="#" className="hover:text-secondary transition-colors">Sobre Nós</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Política de Privacidade</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Termos de Uso</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Trabalhe Conosco</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Payment */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Pagamento</h4>
                        <p className="text-sm text-white/60">Aceitamos as principais bandeiras de cartão de crédito e PIX.</p>
                        <div className="flex gap-2">
                            {/* Placeholders for payment icons */}
                            <div className="w-10 h-6 bg-white/10 rounded"></div>
                            <div className="w-10 h-6 bg-white/10 rounded"></div>
                            <div className="w-10 h-6 bg-white/10 rounded"></div>
                            <div className="w-10 h-6 bg-white/10 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
                    <p>&copy; {new Date().getFullYear()} Óticas Vizz. Todos os direitos reservados.</p>
                </div>
            </Container>
        </footer>
    );
}
