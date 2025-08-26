      // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });

        // Terminal typing animation
        const terminalText = document.querySelector('.typing-text');
        const commands = [
            '$ nmap -sS -O target.com<br>Starting Nmap scan...<br>Host is up (0.013s latency)<br>22/tcp   open   ssh<br>80/tcp   open   http<br>443/tcp  open   https',
            '$ python exploit.py<br>[+] Vulnerability found!<br>[+] Exploit successful<br>[+] Shell access gained',
            '$ splunk search "failed login"<br>Searching for security events...<br>Found 247 failed login attempts<br>[+] Potential brute force detected',
            '$ burpsuite --scan target.com<br>Running vulnerability scan...<br>[!] SQL Injection found<br>[!] XSS vulnerability detected'
        ];

        let currentCommand = 0;
        
        function typeCommand() {
            terminalText.innerHTML = commands[currentCommand];
            currentCommand = (currentCommand + 1) % commands.length;
        }

        // Change command every 4 seconds
        setInterval(typeCommand, 4000);

        // Add hover effects for cards
        const cards = document.querySelectorAll('.skill-category, .project-card, .achievement-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Form submission handling
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Reset after 3 seconds (in case of success/error)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('.section, .skill-category, .project-card, .achievement-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Initialize first section as visible
        document.querySelector('#home').style.opacity = '1';
        document.querySelector('#home').style.transform = 'translateY(0)';

        // Add particle effect to hero section
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#00ff88';
            particle.style.opacity = '0.7';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            document.body.appendChild(particle);
            
            let y = startY;
            const speed = Math.random() * 2 + 1;
            
            function animate() {
                y -= speed;
                particle.style.top = y + 'px';
                particle.style.opacity = y / startY;
                
                if (y < -10) {
                    document.body.removeChild(particle);
                } else {
                    requestAnimationFrame(animate);
                }
            }
            
            animate();
        }
        
        function downloadResume() {
            const resumeUrl = 'DEVADATH_A_CYBERSECURITY_ANALYST.pdf'; // Update with your actual file path
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'DEVADATH_A_CYBERSECURITY_ANALYST.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Create particles periodically
        setInterval(createParticle, 200);

        class TerminalAnimator {
            constructor() {
                this.terminalContent = document.getElementById('terminalContent');
                this.currentScenario = 0;
                this.isAnimating = false;
                
                this.scenarios = [
                    {
                        title: "Network Reconnaissance",
                        commands: [
                            { type: 'command', text: 'nmap -sS -O target.com' },
                            { type: 'output', text: 'Starting Nmap 7.94 ( https://nmap.org )', delay: 800 },
                            { type: 'scanning', delay: 1200 },
                            { type: 'output', text: 'Nmap scan report for target.com', delay: 600 },
                            { type: 'output', text: 'Host is up (0.013s latency)', delay: 400 },
                            { type: 'success', text: '22/tcp    open   ssh     OpenSSH 8.2', delay: 300 },
                            { type: 'success', text: '80/tcp    open   http    Apache 2.4.41', delay: 300 },
                            { type: 'success', text: '443/tcp   open   https   Apache 2.4.41', delay: 300 }
                        ]
                    },
                    {
                        title: "Vulnerability Assessment",
                        commands: [
                            { type: 'command', text: 'python3 vuln_scanner.py --target webapp.com' },
                            { type: 'output', text: '[*] Initializing vulnerability scanner...', delay: 600 },
                            { type: 'scanning', delay: 1000 },
                            { type: 'warning', text: '[!] SQL Injection detected in login form', delay: 800 },
                            { type: 'warning', text: '[!] XSS vulnerability found in search field', delay: 600 },
                            { type: 'error', text: '[!] CRITICAL: Authentication bypass possible', delay: 700 },
                            { type: 'success', text: '[+] Generating detailed report...', delay: 500 },
                            { type: 'success', text: '[+] Scan completed. 3 vulnerabilities found', delay: 600 }
                        ]
                    },
                    {
                        title: "SIEM Threat Detection",
                        commands: [
                            { type: 'command', text: 'splunk search "failed login" | stats count by src_ip' },
                            { type: 'output', text: 'Searching logs for failed authentication attempts...', delay: 700 },
                            { type: 'scanning', delay: 1200 },
                            { type: 'warning', text: '192.168.1.100: 247 failed attempts', delay: 500 },
                            { type: 'warning', text: '10.0.0.55: 156 failed attempts', delay: 400 },
                            { type: 'error', text: '[ALERT] Brute force attack detected!', delay: 600 },
                            { type: 'success', text: '[+] Blocking malicious IPs...', delay: 500 },
                            { type: 'success', text: '[+] Incident response initiated', delay: 400 }
                        ]
                    },
                    {
                        title: "Penetration Testing",
                        commands: [
                            { type: 'command', text: 'msfconsole -q' },
                            { type: 'output', text: 'Starting Metasploit Framework...', delay: 800 },
                            { type: 'command', text: 'use exploit/multi/handler' },
                            { type: 'success', text: '[+] Exploit module loaded', delay: 600 },
                            { type: 'command', text: 'set payload windows/meterpreter/reverse_tcp' },
                            { type: 'command', text: 'exploit' },
                            { type: 'scanning', delay: 1000 },
                            { type: 'success', text: '[+] Exploit completed successfully!', delay: 800 },
                            { type: 'success', text: '[+] Meterpreter session opened', delay: 500 }
                        ]
                    }
                ];
                
                this.init();
            }
            
            init() {
                this.createMatrixRain();
                this.startAnimation();
            }
            
            createMatrixRain() {
                const matrixRain = document.getElementById('matrixRain');
                const chars = '01アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴッン';
                
                for (let i = 0; i < 15; i++) {
                    const column = document.createElement('div');
                    column.className = 'matrix-column';
                    column.style.left = Math.random() * 100 + '%';
                    column.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    column.style.animationDelay = Math.random() * 2 + 's';
                    
                    let columnText = '';
                    for (let j = 0; j < 20; j++) {
                        columnText += chars[Math.floor(Math.random() * chars.length)] + '<br>';
                    }
                    column.innerHTML = columnText;
                    
                    matrixRain.appendChild(column);
                }
            }
            
            async startAnimation() {
                while (true) {
                    if (!this.isAnimating) {
                        await this.runScenario(this.scenarios[this.currentScenario]);
                        this.currentScenario = (this.currentScenario + 1) % this.scenarios.length;
                        await this.delay(3000); // Pause between scenarios
                    }
                    await this.delay(100);
                }
            }
            
            async runScenario(scenario) {
                this.isAnimating = true;
                this.terminalContent.innerHTML = '';
                
                for (const cmd of scenario.commands) {
                    await this.delay(cmd.delay || 500);
                    
                    if (cmd.type === 'command') {
                        await this.typeCommand(cmd.text);
                    } else if (cmd.type === 'scanning') {
                        this.addScanningBar();
                        await this.delay(1500);
                    } else {
                        this.addOutput(cmd.text, cmd.type);
                    }
                }
                
                this.isAnimating = false;
            }
            
            async typeCommand(text) {
                const line = document.createElement('div');
                line.className = 'command-line';
                
                const prompt = document.createElement('span');
                prompt.className = 'prompt';
                prompt.textContent = 'root@kali:~$ ';
                
                const command = document.createElement('span');
                command.className = 'command typing-animation';
                
                line.appendChild(prompt);
                line.appendChild(command);
                this.terminalContent.appendChild(line);
                
                // Animate typing
                for (let i = 0; i <= text.length; i++) {
                    command.textContent = text.substring(0, i);
                    await this.delay(50);
                }
                
                command.classList.remove('typing-animation');
                this.scrollToBottom();
            }
            
            addOutput(text, type = 'output') {
                const output = document.createElement('div');
                output.className = `output ${type}`;
                output.textContent = text;
                this.terminalContent.appendChild(output);
                this.scrollToBottom();
            }
            
            addScanningBar() {
                const scanBar = document.createElement('div');
                scanBar.className = 'scanning-bar';
                this.terminalContent.appendChild(scanBar);
                this.scrollToBottom();
            }
            
            scrollToBottom() {
                this.terminalContent.scrollTop = this.terminalContent.scrollHeight;
            }
            
            delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }
        
        // Add hover effects for terminal dots
        document.addEventListener('DOMContentLoaded', () => {
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.addEventListener('mouseenter', () => {
                    dot.style.transform = 'scale(1.2)';
                    dot.style.boxShadow = dot.classList.contains('red') ? 
                        '0 0 15px rgba(255, 82, 82, 0.8)' : 
                        dot.classList.contains('yellow') ? 
                        '0 0 15px rgba(255, 205, 2, 0.8)' : 
                        '0 0 15px rgba(76, 175, 80, 0.8)';
                });
                
                dot.addEventListener('mouseleave', () => {
                    dot.style.transform = 'scale(1)';
                    dot.style.boxShadow = '';
                });
            });
            
            // Initialize terminal animation
            new TerminalAnimator();
        });
